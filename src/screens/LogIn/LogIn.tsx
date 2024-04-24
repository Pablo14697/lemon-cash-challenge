// React
import { useContext, useState } from 'react';

// React Native
import { Image, View, Pressable } from 'react-native';

// Components
import { Loading } from './components';
import { Typography } from '../../components';

// Styles
import styles from './styles';

// Context
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

// Hooks
import { Logo } from '../../assets/branding';

// Google Sign In
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface Props {
  loading: boolean;
}

const LogIn = ({ loading = false }: Props) => {
  const [error, setError] = useState(false);
  const { setNewToken } = useContext(AuthContext);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        setNewToken(userInfo.idToken);
      }
    } catch (error) {
      setError(!!error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.loginButtonContainer}>
          <Pressable onPress={signIn} style={styles.loginButton}>
            <Typography fontSize={16} color="white" fontWeight="medium">
              Continue with Google
            </Typography>
          </Pressable>
          {error && (
            <Typography fontSize={16} color="red" fontWeight="medium">
              Something wrong happened!
            </Typography>
          )}
        </View>
      )}
    </View>
  );
};

export default LogIn;
