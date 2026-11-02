const MOCK_USER = {
  id: 'u_001',
  name: 'Nusna Rabik',
  email: 'nusna@email.com',
  phone: '77 123 4567',
  initials: 'NR',
  verified: true,
  connected: true,
  accountType: 'Rider Account',
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchProfile() {
  await delay(200);
  return { ...MOCK_USER };
}

export async function updateProfile({ fullName, email, phone }) {
  await delay(400);
  return {
    ok: true,
    user: {
      id: MOCK_USER.id,
      name: fullName,
      email,
      phone,
      initials: fullName
        .split(' ')
        .filter(Boolean)
        .map((s) => s[0])
        .slice(0, 2)
        .join('')
        .toUpperCase(),
      verified: MOCK_USER.verified,
      connected: MOCK_USER.connected,
      accountType: MOCK_USER.accountType,
    },
  };
}

export async function logout() {
  await delay(150);
  return { ok: true };
}