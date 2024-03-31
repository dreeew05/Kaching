import { View } from 'react-native';

// TEST DATA
import { Provider } from 'react-redux';
import CartItemsGenerator from '../../components/Cart/CartItemsGenerator';
import Total from '../../components/Common/Total';
import { Store } from '../../redux/Store';

export default function CartScreen() {
  return (
    <Provider store={Store}>
      <View className="flex-1 bg-white dark:bg-black">
        <View className="flex-1">
          <CartItemsGenerator />
        </View>
        <View>
          <Total page="cart" />
        </View>
      </View>
    </Provider>
  );
}
