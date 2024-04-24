// React Native
import { Image, View } from 'react-native';

// Assets
import { Empty } from '../../assets/icons';

// Components
import Typography from '../Typography/Typography';

// Styles
import styles from './styles';

const GenericIssue = ({ error }: { error: boolean }) => (
  <View style={styles.container}>
    <Image source={Empty} style={styles.emptyLogo} />
    <Typography fontWeight="medium" fontSize={20} color="jetBlack">
      {error ? 'Something wrong happened!' : 'This list is empty!'}
    </Typography>
  </View>
);

export default GenericIssue;
