// Temporary in-memory "API". Replace with a real HTTPS call to the backend later.
import { INCIDENT_STATUS } from '../../constants/incidentStatus';

const incidents = [
  { id: 'i1', riderName: 'Kasun Perera', occurredAt: new Date(2026, 9, 18, 10, 14).toISOString(), status: INCIDENT_STATUS.ACCIDENT },
  { id: 'i2', riderName: 'Amara Silva', occurredAt: new Date(2026, 9, 14, 16, 45).toISOString(), status: INCIDENT_STATUS.SAFE },
  { id: 'i3', riderName: 'Dinesh Fernando', occurredAt: new Date(2026, 9, 2, 19, 30).toISOString(), status: INCIDENT_STATUS.ACCIDENT },
  { id: 'i4', riderName: 'Thilina Jayasinghe', occurredAt: new Date(2026, 8, 24, 14, 10).toISOString(), status: INCIDENT_STATUS.SAFE },
];

const delay = (v) => new Promise((r) => setTimeout(() => r(v), 150));

// Newest first
export const fetchIncidents = () =>
  delay([...incidents].sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt)));