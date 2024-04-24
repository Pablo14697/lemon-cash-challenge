// React
import { useContext } from 'react';

// React Native
import { Image, Pressable, SafeAreaView, View } from 'react-native';

// Styles
import styles from './styles';

// Assets
import LogOut from './assets/logout.png';

// Context
import { AuthContext } from '../../../../providers/AuthProvider/AuthProvider';
import { Typography } from '../../../../components';

const Header = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Typography fontSize={24} fontWeight="medium">
            Crypto Market
          </Typography>
        </View>
        <Pressable onPress={logOut} style={styles.logoutButton}>
          <Image source={LogOut} style={styles.logoutIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Header;
