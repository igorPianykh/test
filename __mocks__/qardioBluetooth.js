module.exports = {
  InitBleManager: jest.fn(),
  BleCheckState: jest.fn(),
  BleManagerDidUpdateState: jest.fn(),
  RemoveAllListeners: jest.fn(),
  StartBluetoothScan: jest.fn(),
  StopBluetoothScan: jest.fn(),
  BleManagerDiscoverPeripheral: jest.fn(),
  BleManagerConnectPeripheral: jest.fn(),
};
