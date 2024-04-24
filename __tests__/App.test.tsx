import { render } from '@testing-library/react-native';
import App from '../App';
import { LogIn } from '../src/screens';

test('Render App', () => {
  render(<LogIn />);
});
