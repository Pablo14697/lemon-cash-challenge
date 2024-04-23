// Providers
import CryptoCurrencyProvider from './CryptoCurrencyProvider';
import AuthProvider from './AuthProvider';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <CryptoCurrencyProvider>{children}</CryptoCurrencyProvider>
  </AuthProvider>
);

export default Providers;
