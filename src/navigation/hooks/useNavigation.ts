// React Navigation
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

type Navigation = NavigationProp<ParamListBase>;

const useNavigationCustom = () => {
  const navigation: Navigation = useNavigation();
  return navigation;
};

export default useNavigationCustom;
