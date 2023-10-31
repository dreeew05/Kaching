import { Text, View, ScrollView } from 'react-native';
// import { PopUpModal } from '../../components/PopUpModal'

// TEST DATA
import CartTotal from '../../components/Cart/CartTotal';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import CartItemsGenerator from '../../components/Cart/CartItemsGenerator';

export default function CartScreen() {
      
  return (
    <Provider store={Store}>
      <View className="flex-1 self-stretch bg-white dark:bg-black">

        <CartItemsGenerator/>

        <CartTotal/>
      </View>
    </Provider>
  );
}


