// React
import { useContext } from 'react';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { CriptoCurrency, Home, LogIn as LogInScreen } from '../screens';

// Components
import { CriptoCurrencyHeader } from '../screens/CriptoCurrency/components';
import { HomeHeader } from '../screens/Home/components';

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
              options={() => ({
                header: () => <HomeHeader />,
              })}
            />
            <Screen
              name="CriptoCurrency"
              component={CriptoCurrency}
              options={() => ({
                header: () => <CriptoCurrencyHeader />,
              })}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
