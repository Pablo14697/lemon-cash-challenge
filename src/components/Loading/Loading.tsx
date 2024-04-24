// React Native
import { View, ActivityIndicator } from 'react-native';

// Styles
import styles from './styles';

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="small" color="#121212" />
  </View>
);

export default Loading;
