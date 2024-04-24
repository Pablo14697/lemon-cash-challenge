// Providers
import CryptoCurrencyProvider from './CryptoCurrencyProvider';
import AuthProvider from './AuthProvider';

// Utils
import { WEB_CLIENT_ID } from '../../hardcoded';

// Library
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    GoogleSignin?.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  return (
    <AuthProvider>
      <CryptoCurrencyProvider>{children}</CryptoCurrencyProvider>
    </AuthProvider>
  );
};

export default Providers;
