import { Text, View, ScrollView } from 'react-native';
// import { PopUpModal } from '../../components/PopUpModal'

// TEST DATA
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import CartItemsGenerator from '../../components/Cart/CartItemsGenerator';
import Total from '../../components/Common/Total';
import RainbowBackground from '../../components/Rainbow';

export default function CartScreen() {
      
  return (
    <RainbowBackground>
      <Provider store={Store}>
        <View className="flex-1 self-stretch pt-16">

          <CartItemsGenerator/>

          <Total page='cart'/>
        </View>
      </Provider>
      </RainbowBackground>
  );
}


