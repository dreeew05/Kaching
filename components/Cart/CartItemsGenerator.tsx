import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/CartRedux/CartSelectors';
import CartItemList from './CartItemList';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

export default function CartItemsGenerator() {
  const cartState = useSelector(selectCart);

  const isCartEmpty = () => {
    if (cartState.cart.length == 0) {
      return true;
    }
  };

  if (isCartEmpty()) {
    return (
      <View className="flex-1">
        <Text className="text-4xl ml-5 text-green" style={{ fontFamily: 'Poppins-Medium' }}>
          Cart
        </Text>
        <View className="flex-1 justify-center items-center">
          <Image
            className="h-48 w-48"
            source={require('../../assets/icons/cart.png')}
            />
          <Text className="text-2xl mt-5 text-zinc-400" style={{ fontFamily: 'Poppins-Medium' }}>
            Your cart is empty
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView>
        <Text className="text-4xl ml-5 text-green" style={{ fontFamily: 'Poppins-Medium' }}>
          Cart
        </Text>
        <CartItemList cart={cartState.cart} />
      </ScrollView>
    );
  }
}
