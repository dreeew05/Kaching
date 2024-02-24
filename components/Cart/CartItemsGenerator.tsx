import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../redux/CartRedux/CartSelectors';
import CartItemList from './CartItemList';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { clearCart } from '../../redux/CartRedux/CartSlice';

export default function CartItemsGenerator() {
  const cartState = useSelector(selectCart);
  const dispatch = useDispatch();

  const isCartEmpty = () => {
    if (cartState.cart.length == 0) {
      return true;
    }
  };

  const deleteAllItemsInCart = () => {
    dispatch(clearCart());
  };

  if (isCartEmpty()) {
    return (
      <View
        className="flex-1"
        style={{
          marginTop: 60,
        }}
      >
        <View className="flex-1 justify-center items-center">
          <Image
            className="h-48 w-48"
            source={require('../../assets/icons/cart.png')}
          />
          <Text
            className="text-2xl mt-5 text-zinc-400"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            Your cart is empty
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView
        style={{
          marginTop: 60,
        }}
      >
        <View className="flex-1 flex-row items-start">
          <Text
            className="text-4xl ml-5 mt-1 text-green flex-1"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            Cart
          </Text>
          <TouchableOpacity onPress={() => deleteAllItemsInCart()}>
            <View
              className="flex-1 mr-5 bg-red-500 items-center 
              justify-center pl-5 pr-5 rounded-full"
            >
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Poppins-Bold',
                }}
              >
                Remove All
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <CartItemList cart={cartState.cart} />
      </ScrollView>
    );
  }
}
