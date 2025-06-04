export const deviceTypes = [
  {
    id: 'qardio1',
    label: 'QardioArm',
    description: 'This device uses batteries',
  },
  {
    id: 'qardio2',
    label: 'QardioArm 2',
    description: 'This device uses USB C',
  },
];

export const errorTypes = {
  invalidMeasurements: {
    title: 'Measurement error',
    message:
      'Reposition the cuff and take the measurement again, keeping your arm still and avoid talking during the process.',
  },
  deviceError: {
    title: 'Device Connection error',
    message:
      'Error while performing measurements. Check if Bluetooth is enabled and try again.',
  },
};

export const getCurrentDateTime = () => {
  const now = new Date();
  return now.toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS AM/PM"
};
