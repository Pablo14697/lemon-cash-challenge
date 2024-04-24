import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  graphContainer: {
    height: '70%',
    width: '100%',
    backgroundColor: '#e6e6e6',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20,
  },
  switchContainer: {
    height: 40,
    width: '100%',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    marginTop: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerButton: {
    width: '25%',
    borderRadius: 10,
    padding: 4,
  },
  backgroundButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: -1,
  },
});

export default styles;
