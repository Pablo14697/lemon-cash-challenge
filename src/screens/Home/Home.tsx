// React Native
import { FlatList, SafeAreaView, View } from 'react-native';

// Styles
import styles from './styles';

// Components
import { HomeHeader, Item } from './components';
import { GenericIssue, Loading } from '../../components';

// Hooks
import { useNavigation } from '../../navigation/hooks';
import useCryptoCurrencies from './hooks/useCryptoCurrencies';

// Types
import { CryptoCurrencyInfoType } from '../../types/CryptoCurrency';

const Home = () => {
  const navigation = useNavigation();
  const {
    loading,
    refreshing,
    cryptoCurrencies,
    setCryptoCurrencyInfo,
    onRefresh,
    onEndReached,
    toggleSelected,
    onToggleChanged,
    error,
  } = useCryptoCurrencies();

  const handleItemPressed = (
    cryptoCurrencySelected: CryptoCurrencyInfoType,
  ) => {
    setCryptoCurrencyInfo(cryptoCurrencySelected);
    navigation.navigate('CryptoCurrency');
  };

  const renderItem = ({ item }: { item: CryptoCurrencyInfoType }) => {
    const cryptoCurrencyInfo = {
      id: item?.id,
      name: item?.name,
      symbol: item?.symbol,
      price: item?.price,
    };
    return (
      <Item
        info={cryptoCurrencyInfo}
        onPress={() => {
          handleItemPressed(cryptoCurrencyInfo);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <HomeHeader
        toggleSelected={toggleSelected}
        setToggleSelected={onToggleChanged}
      />
      <View style={styles.contentContainer}>
        {loading ? (
          <Loading />
        ) : error || cryptoCurrencies.length === 0 ? (
          <GenericIssue error={error} />
        ) : (
          <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            data={cryptoCurrencies}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.separatorItem} />}
            contentContainerStyle={styles.flatListContentContainerStyle}
            onEndReached={onEndReached}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
