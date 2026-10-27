import { useEffect, useMemo, useState } from 'react';
import { RIDE_FILTER } from '../constants/rideFilters';
import { isSameDay } from '../utils/format';
import * as api from '../services/api/ridesApi';

const matchesFilter = (ride, filter, now) => {
  const d = new Date(ride.startedAt);
  if (filter === RIDE_FILTER.TODAY) return isSameDay(d, now);
  if (filter === RIDE_FILTER.WEEK) {
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    return d >= monday;
  }
  if (filter === RIDE_FILTER.MONTH) {
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }
  return true;
};

export default function useRides(filter = RIDE_FILTER.ALL) {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.fetchRides().then((data) => {
      if (active) {
        setRides(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const now = new Date();
    return rides.filter((r) => matchesFilter(r, filter, now));
  }, [rides, filter]);

  const totalDistanceKm = useMemo(() => filtered.reduce((sum, r) => sum + r.distanceKm, 0), [filtered]);

  return { rides: filtered, totalDistanceKm, loading };
}