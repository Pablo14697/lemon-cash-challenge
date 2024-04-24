// React Native
import { Image, View } from 'react-native';

// Assets
import { Empty } from '../../assets/icons';

// Components
import Typography from '../Typography/Typography';

const GenericIssue = ({ error }: { error: boolean }) => (
  <View
    style={{
      height: '100%',
      width: '100%',
      alignItems: 'center',
      paddingTop: '50%',
      backgroundColor: '#fafafa',
    }}>
    <Image source={Empty} style={{ height: 100, width: 100 }} />
    <Typography fontWeight="medium" fontSize={20} color={'jetBlack'}>
      {error ? 'Something wrong happened!' : `This list is empty!`}
    </Typography>
  </View>
);

export default GenericIssue;
