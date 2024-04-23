// Providers
import CriptoCurrencyProvider from './CriptoCurrencyProvider';
import AuthProvider from './AuthProvider';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <CriptoCurrencyProvider>{children}</CriptoCurrencyProvider>
  </AuthProvider>
);

export default Providers;
