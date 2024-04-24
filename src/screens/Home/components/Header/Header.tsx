// React
import { useContext } from 'react';

// React Native
import { Image, Pressable, View } from 'react-native';

// Components
import { Typography } from '../../../../components';

// Styles
import styles from './styles';

// Assets
import LogOut from './assets/logout.png';

// Context
import { AuthContext } from '../../../../providers/AuthProvider/AuthProvider';

type ToggleType = 'ALL' | 'STARRED';

interface Props {
  toggleSelected: ToggleType;
  setToggleSelected: (x: ToggleType) => void;
}

enum TOGGLE {
  ALL = 'ALL',
  STARRED = 'STARRED',
}

const Header = ({ toggleSelected, setToggleSelected }: Props) => {
  const { logOut } = useContext(AuthContext);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.toggleContainer}>
        <Pressable
          onPress={() => setToggleSelected(TOGGLE.ALL)}
          style={
            toggleSelected === TOGGLE.ALL
              ? styles.toggleButtonActive
              : styles.toggleButtonInactive
          }>
          <Typography fontSize={14} fontWeight="medium">
            All
          </Typography>
        </Pressable>
        <Pressable
          onPress={() => setToggleSelected(TOGGLE.STARRED)}
          style={
            toggleSelected === TOGGLE.STARRED
              ? styles.toggleButtonActive
              : styles.toggleButtonInactive
          }>
          <Typography fontSize={14} fontWeight="medium">
            Starred
          </Typography>
        </Pressable>
      </View>
      <Pressable onPress={logOut} style={styles.logoutButton}>
        <Image source={LogOut} style={styles.logoutIcon} />
      </Pressable>
    </View>
  );
};

export default Header;
