// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { Home, LogIn } from '../screens';

const { Navigator, Screen } = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="LogIn" component={LogIn} />
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
