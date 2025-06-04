// Combine all @react-navigation/native mocks
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(),
    createNavigationContainerRef: jest.fn(() => ({
      isReady: jest.fn(() => true),
      current: null,
    })),
  };
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('@gluestack-ui/themed', () => ({
  useToast: jest.fn(),
}));
jest.mock('react-native-keychain', () => ({
  resetGenericPassword: jest.fn(),
}));
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock @op-engineering/op-sqlite
jest.mock('@op-engineering/op-sqlite', () => ({
  DB: jest.fn(),
}));

// Mock react-native-permissions
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {},
  request: jest.fn(),
  RESULTS: {},
}));

// Mock @react-navigation/stack
jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    }),
  };
});

// Mock @react-navigation/bottom-tabs
jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: jest.fn().mockReturnValue({
      Navigator: ({ children }) => children,
      Screen: ({ children }) => children,
    }),
  };
});

// Mock react-native-progress
jest.mock('react-native-progress', () => ({
  Bar: () => null,
})); 