// React
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

// React Native
import { Text, Image, View, Pressable, ActivityIndicator } from 'react-native';

// Styles
import styles from './styles';

// Context
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

// Hooks
import { Logo } from '../../assets/branding';

// Google Sign In
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Utils
import { WEB_CLIENT_ID } from '../../../hardcoded';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

interface Props {
  loading: boolean;
}

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="small" color="#121212" />
  </View>
);

const LogIn = ({ loading = false }: Props) => {
  const [error, setError] = useState(false);
  const { t } = useTranslation();
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
          <Pressable onPress={() => signIn()} style={styles.loginButton}>
            <Text style={styles.textButton}>{t('LOG_IN')}</Text>
          </Pressable>
          {error && (
            <Text style={styles.errorText}>Something wrong happened!</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default LogIn;
