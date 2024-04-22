// React Native
import { Text, Image, View, Pressable } from 'react-native';

// Hooks
import { useNavigation } from '../../navigation/hooks';
import { Logo } from '../../assets/branding';
import { useTranslation } from 'react-i18next';

const LogIn = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
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
      <Pressable
        onPress={() => navigation.navigate('Home')}
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
    </View>
  );
};

export default LogIn;
