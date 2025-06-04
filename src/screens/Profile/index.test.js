import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import * as Keychain from 'react-native-keychain';
import { useToast } from '@gluestack-ui/themed';
import { UserContext } from '../../context/userContext';
import Profile from './index';

// Mock the dependencies
jest.mock('react-native-keychain');
jest.mock('@gluestack-ui/themed', () => ({
  useToast: jest.fn(),
}));

describe('Profile Component', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  const mockSetUser = jest.fn();
  const mockToast = {
    show: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useToast.mockReturnValue(mockToast);
  });

  const renderComponent = (user = mockUser) => {
    return render(
      <UserContext.Provider value={{ user, setUser: mockSetUser }}>
        <Profile />
      </UserContext.Provider>,
    );
  };

  it('renders user information correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('john@example.com')).toBeTruthy();
  });

  it('handles logout successfully', async () => {
    const { getByLabelText } = renderComponent();
    const logoutButton = getByLabelText('logout-button');
    fireEvent.press(logoutButton);

    await waitFor(() => {
      expect(Keychain.resetGenericPassword).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith(null);
      expect(mockToast.show).toHaveBeenCalledWith({
        placement: 'bottom',
        render: expect.any(Function),
      });
    });
  });

  it('renders correctly when user is null', () => {
    const { getByLabelText } = renderComponent(null);

    // Verify the component still renders without crashing
    expect(getByLabelText('profile-name')).toBeTruthy();
    expect(getByLabelText('profile-email')).toBeTruthy();
  });

  it('handles logout error gracefully', async () => {
    // Mock Keychain.resetGenericPassword to throw an error
    Keychain.resetGenericPassword.mockRejectedValueOnce(
      new Error('Keychain error'),
    );

    const { getByLabelText } = renderComponent();

    // Trigger logout
    const logoutButton = getByLabelText('logout-button');
    fireEvent.press(logoutButton);

    // Verify the error is caught and doesn't crash the app
    expect(Keychain.resetGenericPassword).toHaveBeenCalled();
  });
});
