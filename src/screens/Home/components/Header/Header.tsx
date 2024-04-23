// React
import { useContext } from 'react';

// React Native
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';

// Styles
import styles from './styles';

// Assets
import LogOut from './assets/logout.png';

// Context
import { AuthContext } from '../../../../providers/AuthProvider/AuthProvider';

const Header = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Crypto Market</Text>
        </View>
        <Pressable onPress={logOut} style={styles.logoutButton}>
          <Image source={LogOut} style={styles.logoutIcon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Header;
