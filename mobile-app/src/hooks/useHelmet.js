// Placeholder until the BLE service exists (services/ble).
// Later this will read the real connection state and battery level from the helmet.
export default function useHelmet() {
  return { connected: false, batteryPercent: null };
}