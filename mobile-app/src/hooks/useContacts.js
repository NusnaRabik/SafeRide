import { useCallback, useEffect, useState } from 'react';
import { PRIORITY } from '../constants/priorities';
import * as api from '../services/api/contactsApi';

// Primary contacts are alerted first
const sortByPriority = (list) =>
  [...list].sort((a, b) =>
    a.priority === b.priority ? 0 : a.priority === PRIORITY.PRIMARY ? -1 : 1
  );

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await api.fetchContacts();
    setContacts(sortByPriority(data));
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addContact = async (data) => {
    const created = await api.createContact(data);
    setContacts((prev) => sortByPriority([...prev, created]));
  };

  const editContact = async (id, data) => {
    const updated = await api.updateContact(id, data);
    setContacts((prev) => sortByPriority(prev.map((c) => (c.id === id ? updated : c))));
  };

  const deleteContact = async (id) => {
    await api.removeContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return { contacts, loading, addContact, editContact, deleteContact };
}