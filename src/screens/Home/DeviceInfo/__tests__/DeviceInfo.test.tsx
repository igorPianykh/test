import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from '../index';
import { DeviceContext } from '../../../../context/deviceContext';
import screenNames from '../../../../navigation/screenNames';
import { deviceTypes } from '../../utils';

jest.mock('@react-navigation/native');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

const renderWithDevice = (device: { id: string } | null) => {
  (useNavigation as jest.Mock).mockReturnValue({
    navigate: mockNavigate,
    goBack: mockGoBack,
  });

  return render(
    <DeviceContext.Provider value={{ device, setDevice: jest.fn() }}>
      <DeviceInfo />
    </DeviceContext.Provider>,
  );
};

describe('DeviceInfo Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows instructions for QardioArm1', () => {
    const { queryByText } = renderWithDevice({ id: deviceTypes[0].id });

    expect(queryByText('Turn on your QardioArm')).toBeTruthy();
    expect(
      queryByText('Plug your device using charge cable for 5 seconds to wake it up.'),
    ).toBeNull();
  });

  it('shows instructions for QardioArm2', () => {
    const { queryByText } = renderWithDevice({ id: deviceTypes[1].id });

    expect(
      queryByText('Turn on your QardioArm 2 to begin the onboarding process'),
    ).toBeTruthy();
    expect(
      queryByText('Plug your device using charge cable for 5 seconds to wake it up.'),
    ).toBeTruthy();
  });

  it('navigates to DeviceConnection on button press', () => {
    const { getByText } = renderWithDevice({ id: deviceTypes[0].id });

    fireEvent.press(getByText('Start Search'));

    expect(mockNavigate).toHaveBeenCalledWith(screenNames.DeviceConnection);
  });
});
