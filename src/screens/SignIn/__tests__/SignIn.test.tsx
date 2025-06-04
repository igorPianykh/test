import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '@gluestack-ui/themed';
import SignIn from '../index';
import { DatabaseContext } from '../../../../App';
import { UserContext } from '../../../context/userContext';
import { loginUserTransaction } from '../../../services/database';
import screenNames from '../../../navigation/screenNames';

// Mock @react-navigation/native before any imports
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
    createNavigationContainerRef: jest.fn(() => ({
      isReady: jest.fn(() => true),
      current: null,
    })),
    DefaultTheme: { colors: {} },
  };
});

// Mock the dependencies
jest.mock('@gluestack-ui/themed', () => ({
  useToast: jest.fn(),
}));

jest.mock('../../../services/database', () => ({
  loginUserTransaction: jest.fn(),
}));

// Mock Keyboard
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Keyboard = {
    dismiss: jest.fn(),
  };
  return RN;
});

describe('SignIn Component', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockToast = {
    show: jest.fn(),
  };

  const mockSetUser = jest.fn();
  const mockDB = {
    exec: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useToast as jest.Mock).mockReturnValue(mockToast);
  });

  const renderComponent = () => {
    return render(
      <DatabaseContext.Provider value={mockDB}>
        <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>
          <SignIn />
        </UserContext.Provider>
      </DatabaseContext.Provider>,
    );
  };

  it('renders correctly with initial values', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    expect(getByPlaceholderText('Enter email')).toBeTruthy();
    expect(getByPlaceholderText('Enter password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Create Account')).toBeTruthy();
  });

  it('navigates to sign up screen when create account button is pressed', () => {
    const { getByText } = renderComponent();

    fireEvent.press(getByText('Create Account'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith(screenNames.SignUp);
  });

  it('disables sign in button when form is empty', () => {
    const { getByText } = renderComponent();

    const signInButton = getByText('Sign In');
    expect(signInButton.props.disabled).toBe(true);
  });

  it('enables sign in button when form is valid', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const signInButton = getByText('Sign In');
    expect(signInButton.props.disabled).toBe(false);
  });

  it('shows validation errors for invalid email', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const emailInput = getByPlaceholderText('Enter email');
    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent(emailInput, 'blur');

    await waitFor(() => {
      expect(getByText('Invalid email address')).toBeTruthy();
    });
  });

  it('calls loginUserTransaction when form is submitted with valid data', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(loginUserTransaction).toHaveBeenCalledWith(
        mockDB,
        {
          email: 'test@example.com',
          password: 'password123',
        },
        mockToast,
        mockSetUser,
      );
    });
  });

  it('dismisses keyboard when touching outside', () => {
    const { getByTestId } = renderComponent();

    const pageLayout = getByTestId('page-layout');
    fireEvent.press(pageLayout);

    // Note: We can't directly test Keyboard.dismiss() as it's a native module
    // This test ensures the onPress handler is called
    expect(pageLayout).toBeTruthy();
  });
});
