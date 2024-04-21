import { RouteProp, useRoute } from '@react-navigation/native';
type Route = RouteProp<{ params: { [x: string]: string } }>;

const useRouteCustom = () => {
  const route: Route = useRoute();
  return route;
};

export default useRouteCustom;
