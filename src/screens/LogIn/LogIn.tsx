// React
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

// React Native
import { Text, Image, View, Pressable, ActivityIndicator } from 'react-native';

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
    <View
      style={{
        height: '100%',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: '50%',
        paddingBottom: '20%',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        justifyContent: 'space-between',
      }}>
      <Image
        source={Logo}
        style={{
          height: '40%',
          width: '40%',
          objectFit: 'contain',
        }}
      />
      {loading ? (
        <View
          style={{
            width: '100%',
            height: 60,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="small" color="#121212" />
        </View>
      ) : (
        <View style={{ width: '100%', alignItems: 'center', gap: 10 }}>
          <Pressable
            onPress={() => signIn()}
            style={{
              backgroundColor: '#121212',
              width: '100%',
              height: 60,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#ffffff',
                fontFamily: 'NeueMontreal-Medium',
              }}>
              {t('LOG_IN')}
            </Text>
          </Pressable>
          {error && (
            <Text
              style={{
                fontSize: 16,
                color: 'red',
                fontFamily: 'NeueMontreal-Medium',
              }}>
              Something wrong happened!
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default LogIn;
