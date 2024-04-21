// React Native
import { Text } from 'react-native';

// Hooks
import { useRoute } from '../../navigation/hooks';

const Home = () => {
  const route = useRoute();
  return <Text>This is {route.params.name}&apos;s profile</Text>;
};

export default Home;
