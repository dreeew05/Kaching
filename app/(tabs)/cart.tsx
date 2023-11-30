import { Text, View, ScrollView } from 'react-native';
// import { PopUpModal } from '../../components/PopUpModal'

// TEST DATA
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import CartItemsGenerator from '../../components/Cart/CartItemsGenerator';
import Total from '../../components/Common/Total';

export default function CartScreen() {
  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white dark:bg-black">
        <CartItemsGenerator />

        <Total page="cart" />
      </View>
    </Provider>
  );
}
