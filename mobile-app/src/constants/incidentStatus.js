import { colors } from './theme';

export const INCIDENT_STATUS = { ACCIDENT: 'accident', SAFE: 'safe' };

// How each incident status looks in the list
export const INCIDENT_STATUS_UI = {
  [INCIDENT_STATUS.ACCIDENT]: {
    icon: 'warning',
    label: 'Possible accident detected',
    color: colors.danger,
    background: colors.dangerSurface,
  },
  [INCIDENT_STATUS.SAFE]: {
    icon: 'check-circle',
    label: 'Rider confirmed safe',
    color: colors.success,
    background: colors.successSurface,
  },
};