// Temporary in-memory "API". Replace each function body with a real HTTPS call
// (axios/fetch) to the backend later; the hook and screens will not need to change.
import { PRIORITY } from '../../constants/priorities';

let db = [
  { id: '1', name: 'Mom', phone: '+94 77 123 4567', priority: PRIORITY.PRIMARY },
  { id: '2', name: 'Brother', phone: '+94 71 987 6543', priority: PRIORITY.SECONDARY },
];

const delay = (v) => new Promise((r) => setTimeout(() => r(v), 150));

export const fetchContacts = () => delay([...db]);

export const createContact = (data) => {
  const contact = { id: Date.now().toString(), ...data };
  db = [...db, contact];
  return delay(contact);
};

export const updateContact = (id, data) => {
  db = db.map((c) => (c.id === id ? { ...c, ...data } : c));
  return delay(db.find((c) => c.id === id));
};

export const removeContact = (id) => {
  db = db.filter((c) => c.id !== id);
  return delay(true);
};