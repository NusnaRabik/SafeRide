const bcrypt = require('bcryptjs');
const { z } = require('zod');
const { sequelize, User, UserSetting, EmergencyContact } = require('../models');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { normalizePhone, isValidPhone } = require('../utils/phone');
const { signToken } = require('../utils/token');

// The app sends ONE "identifier" (email or mobile number). Explicit email/phone also work.
const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  identifier: z.string().trim().min(1).max(150).optional(),
  email: z.string().trim().toLowerCase().email().max(150).optional(),
  phone: z.string().trim().min(9).max(20).optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').max(72),
});

const loginSchema = z.object({
  identifier: z.string().trim().min(1).optional(),
  email: z.string().trim().min(1).optional(), // older clients
  password: z.string().min(1),
});

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, phone: u.phone });

// Works out which of email / phone the person gave
function resolveContact({ identifier, email, phone }) {
  let e = email || null;
  let p = phone || null;
  if (identifier) {
    if (identifier.includes('@')) e = e || identifier.toLowerCase();
    else p = p || identifier;
  }
  if (e && !z.string().email().safeParse(e).success) throw new ApiError(400, 'Enter a valid email address');
  p = p ? normalizePhone(p) : null;
  if (p && !isValidPhone(p)) throw new ApiError(400, 'Enter a valid mobile number');
  if (!e && !p) throw new ApiError(400, 'An email address or mobile number is required');
  return { email: e, phone: p };
}

exports.register = asyncHandler(async (req, res) => {
  const body = registerSchema.parse(req.body);
  const { email, phone } = resolveContact(body);

  if (email && (await User.findOne({ where: { email } }))) throw new ApiError(409, 'Email is already registered');
  if (phone && (await User.findOne({ where: { phone } }))) throw new ApiError(409, 'Phone number is already registered');

  const passwordHash = await bcrypt.hash(body.password, 12);

  const user = await sequelize.transaction(async (t) => {
    const created = await User.create({ name: body.name, email, phone, passwordHash }, { transaction: t });
    await UserSetting.create({ userId: created.id }, { transaction: t });
    // If this person was already added as someone's emergency contact, link the account now
    if (phone) await EmergencyContact.update({ linkedUserId: created.id }, { where: { phone }, transaction: t });
    return created;
  });

  res.status(201).json({ token: signToken(user), user: publicUser(user) });
});

exports.login = asyncHandler(async (req, res) => {
  const body = loginSchema.parse(req.body);
  const identifier = body.identifier || body.email;
  if (!identifier) throw new ApiError(400, 'Enter your email or mobile number');

  const where = identifier.includes('@') ? { email: identifier.toLowerCase() } : { phone: normalizePhone(identifier) };
  const user = await User.scope('withPassword').findOne({ where });

  // Same message for "no such user" and "wrong password" so accounts can't be probed
  if (!user || !(await bcrypt.compare(body.password, user.passwordHash))) {
    throw new ApiError(401, 'Invalid email/phone or password');
  }

  res.json({ token: signToken(user), user: publicUser(user) });
});

exports.me = asyncHandler(async (req, res) => {
  const settings = await UserSetting.findByPk(req.user.id);
  res.json({
    user: publicUser(req.user),
    settings: settings
      ? { emergencyAlerts: settings.emergencyAlerts, rideNotifications: settings.rideNotifications }
      : null,
  });
});
