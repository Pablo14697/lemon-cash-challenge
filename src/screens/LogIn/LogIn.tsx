// React Native
import { Text, Image, View } from 'react-native';

// Hooks
import { useNavigation } from '../../navigation/hooks';
import { Logo } from '../../assets/branding';
import { useTranslation } from 'react-i18next';

const LogIn = () => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        padding: 20,
        alignItems: 'center',
      }}>
      <Image
        source={Logo}
        style={{
          height: '25%',
          width: '25%',
          objectFit: 'contain',
        }}
      />
      <Text style={{ fontSize: 30, fontFamily: 'NeueMontreal-Light' }}>
        {t('LOG_IN')}
      </Text>
    </View>
  );
};

export default LogIn;
