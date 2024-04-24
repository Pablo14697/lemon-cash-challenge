// React
import { useContext } from 'react';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { CryptoCurrency, Home, LogIn as LogInScreen } from '../screens';

// Context
import { AuthContext } from '../providers/AuthProvider/AuthProvider';

const { Navigator, Screen } = createNativeStackNavigator();

const Navigation = () => {
  const { isSignedIn, loading } = useContext(AuthContext);

  const LogIn = () => <LogInScreen loading={loading} />;
  return (
    <NavigationContainer>
      <Navigator>
        {!isSignedIn ? (
          <Screen
            name="LogIn"
            component={LogIn}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Screen
              name="CryptoCurrency"
              component={CryptoCurrency}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
