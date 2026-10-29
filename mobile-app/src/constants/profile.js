export const ACCOUNT_TYPE = 'Rider Account';

export const APP_VERSION = 'v1.0';

export const RIDER_ID = '4092';

export const COUNTRY_CODE = {
  flag: '🇱🇰',
  dial: '+94',
  iso: 'LK',
};

export const MENU_ITEMS = [
  {
    key: 'edit-profile',
    icon: 'person',
    title: 'Edit Profile',
    subtitle: 'Update personal info and contact details',
    variant: 'default',
    route: 'EditProfile',
  },
  {
    key: 'emergency-contacts',
    icon: 'group',
    title: 'Emergency Contacts',
    subtitle: 'Manage your trusted contacts',
    variant: 'default',
    route: 'EmergencyContacts',
  },
  {
    key: 'ride-history',
    icon: 'motorcycle',
    title: 'Ride History',
    subtitle: 'View previous rides and routes',
    variant: 'default',
    route: 'RideHistory',
  },
  {
    key: 'accident-history',
    icon: 'warning',
    title: 'Accident History',
    subtitle: 'View recorded accident alerts',
    variant: 'danger',
    route: 'AccidentHistory',
  },
  {
    key: 'settings',
    icon: 'settings',
    title: 'Settings',
    subtitle: 'Notifications, Account, Privacy',
    variant: 'default',
    route: 'Settings',
  },
];

export const EDIT_PROFILE_FIELDS = {
  fullName: {
    label: 'Full Name',
    placeholder: 'e.g. John Doe',
    icon: 'person',
    keyboardType: 'default',
    autoCapitalize: 'words',
    autoComplete: 'name',
    required: true,
  },
  email: {
    label: 'Email Address',
    placeholder: 'rider@example.com',
    icon: 'mail',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
    required: true,
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    errorMessage: 'Enter a valid email address',
  },
  phone: {
    label: 'Phone Number',
    placeholder: '77 000 0000',
    icon: 'phone',
    keyboardType: 'phone-pad',
    autoCapitalize: 'none',
    autoComplete: 'tel',
    required: true,
    validate: (v) => v.replace(/\D/g, '').length >= 7,
    errorMessage: 'Enter a valid phone number',
  },
};