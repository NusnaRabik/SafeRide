// Temporary in-memory "API". Replace with a real HTTPS call to the backend:
//   POST /auth/login  { identifier, password }  ->  { token, user }
const delay = (v) => new Promise((r) => setTimeout(() => r(v), 600));

export const login = async ({ identifier, password }) => {
  // Fake rule for testing: any password with 6+ characters works
  if (password.length < 6) {
    await delay();
    throw new Error('Incorrect email/phone or password.');
  }
  return delay({ token: 'mock-token', user: { name: 'Rider', identifier } });
};

// Later: POST /auth/register  { fullName, identifier, password }  ->  { user }
export const register = async ({ fullName, identifier }) => {
  return delay({ user: { name: fullName, identifier } });
};