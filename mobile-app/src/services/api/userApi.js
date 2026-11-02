// Temporary in-memory "API". Later: GET /users/me from the backend.
const delay = (v) => new Promise((r) => setTimeout(() => r(v), 100));

export const fetchCurrentUser = () => delay({ name: 'Nusna' });