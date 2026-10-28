import { useEffect, useState } from 'react';
import * as api from '../services/api/userApi';

export default function useCurrentUser() {
  const [user, setUser] = useState({ name: '' });

  useEffect(() => {
    let active = true;
    api.fetchCurrentUser().then((u) => active && setUser(u));
    return () => {
      active = false;
    };
  }, []);

  return user;
}