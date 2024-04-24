// React Native
import { View, ScrollView, SafeAreaView, RefreshControl } from 'react-native';

// Components
import { Graph, Price } from './components';
import { Loading } from '../../components';

// Styles
import styles from './styles';

// Hooks
import useCryptoCurrency from './hooks/useCryptoCurrency';

const CryptoCurrency = () => {
  const { info, cryptoCurrencyInfo, loading, refreshing, onRefresh } =
    useCryptoCurrency();

  const quote = info?.quote?.USD;

  return (
    <SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainerStyle}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.cryptoInfoContainer}>
            <Price value={quote?.price} id={cryptoCurrencyInfo?.id} />
            <Graph id={info.id} quote={quote} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CryptoCurrency;
