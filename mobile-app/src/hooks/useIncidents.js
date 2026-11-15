import { useEffect, useState } from 'react';
import * as api from '../services/api/incidentsApi';

export default function useIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.fetchIncidents().then((data) => {
      if (active) {
        setIncidents(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { incidents, loading };
}