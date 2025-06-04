import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import * as qardioBluetooth from 'qardioBluetooth'; // Import your qardioBluetooth module
import { UserContext } from '../../context/userContext.tsx';
import { DeviceContext } from '../../context/deviceContext.tsx';
import screenNames from '../../navigation/screenNames.ts'; // Import your screen names
import Home from './index'; // Correct default import

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
    useFocusEffect: jest.fn(cb => cb()),
    createNavigationContainerRef: jest.fn(() => ({
      isReady: jest.fn(() => true),
      current: null,
    })),
  };
});
jest.mock('@gluestack-ui/themed');
jest.mock('react-native-keychain');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

// Mock the qardioBluetooth module
jest.mock('qardioBluetooth', () => ({
  BleCheckState: jest.fn(),
  BleManagerDidUpdateState: jest.fn(),
  RemoveAllListeners: jest.fn(),
  StartBluetoothScan: jest.fn(),
  StopBluetoothScan: jest.fn(),
  BleManagerDiscoverPeripheral: jest.fn(),
  BleManagerConnectPeripheral: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockSetUser = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  useNavigation.mockReturnValue({ navigate: mockNavigate });
  React.useContext.mockImplementation(context => {
    if (context === UserContext) {
      return { user: null, setUser: mockSetUser };
    }
    if (context === DeviceContext) {
      return { device: null, setDevice: jest.fn() };
    }
    return null;
  });
});

describe.skip('Home Component', () => {
  it('renders the title', () => {
    render(<Home />);
    expect(screen.getByText('Home')).toBeVisible();
  });

  it('renders the "START" button', () => {
    render(<Home />);
    expect(screen.getByText('START')).toBeVisible();
  });

  it('navigates to the ChooseDevice screen when the "START" button is pressed', async () => {
    render(<Home />);
    const startButton = screen.getByText('START');
    fireEvent.press(startButton);
    expect(mockNavigate).toHaveBeenCalledWith(screenNames.ChooseDevice);
  });

  it('displays the Bluetooth disabled message when bluetoothState is "off"', async () => {
    // Mock the Bluetooth state to be "off"
    qardioBluetooth.BleCheckState.mockImplementation(cb => cb('off'));
    render(<Home />);
    expect(
      screen.getByText(
        'Bluetooth is disabled. Please, turn on Bluetooth to use device.',
      ),
    ).toBeVisible();
  });
  it('calls BleCheckState and BleManagerDidUpdateState on mount', () => {
    render(<Home />);
    expect(qardioBluetooth.BleCheckState).toHaveBeenCalled();
    expect(qardioBluetooth.BleManagerDidUpdateState).toHaveBeenCalled();
  });
  it('removes listeners on unmount', () => {
    const { unmount } = render(<Home />);
    unmount();
    expect(qardioBluetooth.RemoveAllListeners).toHaveBeenCalled();
  });
});
