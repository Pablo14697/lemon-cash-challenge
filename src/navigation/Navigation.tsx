// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { CriptoCurrency, Home, LogIn } from '../screens';

// Components
import { CriptoCurrencyHeader } from '../screens/CriptoCurrency/components';

const { Navigator, Screen } = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Screen
          name="CriptoCurrency"
          component={CriptoCurrency}
          options={() => ({
            header: () => <CriptoCurrencyHeader />,
          })}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
