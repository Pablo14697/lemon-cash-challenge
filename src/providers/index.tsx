import CriptoCurrencyProvider from './CriptoCurrencyProvider';

const Providers = ({ children }: { children: React.ReactNode }) => (
  <CriptoCurrencyProvider>{children}</CriptoCurrencyProvider>
);

export default Providers;
