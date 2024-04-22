// Navigation Component
import Navigation from './src/navigation';

// Providers
import Providers from './src/providers';

// Translations
import './src/translations/i18n';

const App = () => (
  <Providers>
    <Navigation />
  </Providers>
);

export default App;
