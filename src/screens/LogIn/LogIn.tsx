// React Native
import { Button } from 'react-native';

// Hooks
import { useNavigation } from '../../navigation/hooks';

const LogIn = () => {
  const navigation = useNavigation();
  return (
    <Button
      title="Go to Lemon's profile"
      onPress={() => navigation.navigate('Home', { name: 'Lemon' })}
    />
  );
};

export default LogIn;
