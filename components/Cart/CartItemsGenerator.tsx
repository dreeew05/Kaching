import { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../redux/CartRedux/CartSelectors';
import { clearCart } from '../../redux/CartRedux/CartSlice';
import CustomModal from '../Modals/CustomModal';
import CartItemList from './CartItemList';

export default function CartItemsGenerator() {
  const cartState = useSelector(selectCart);
  const dispatch = useDispatch();

  const [removeModalVisible, setRemoveModalVisible] = useState(false);

  const isCartEmpty = () => {
    if (cartState.cart.length == 0) {
      return true;
    }
  };

  const deleteAllItemsInCart = () => {
    setRemoveModalVisible(false);
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
      <View className="flex-1">
        <View className="flex flex-row mt-20 items-center">
          <Text
            className="text-4xl ml-5 mt-1 text-green flex-1"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            Cart
          </Text>

          <TouchableHighlight
            className={` self-center rounded-full p-2 mb-5 bg-red-500 mr-5`} // Use the disabled prop to conditionally apply styles
            onPress={() => setRemoveModalVisible(true)} // Pass a function that sets the removeModalVisible state to true
          >
            <Text
              className={`text-white text-base font-bold self-center pl-3 pr-3`}
            >
              Remove All
            </Text>
          </TouchableHighlight>
        </View>
        <ScrollView>
          <CartItemList cart={cartState.cart} />

          <CustomModal
            visible={removeModalVisible}
            message="Are you sure you want to remove all items in your cart?"
            optionOneText="Yes"
            optionTwoText="Cancel"
            optionOnePressed={() => deleteAllItemsInCart()}
            optionTwoPressed={() => setRemoveModalVisible(false)}
            optionOneColor="blue"
            optionTwoColor="red"
            closeModal={() => setRemoveModalVisible(false)}
          />
        </ScrollView>
      </View>
    );
  }
}
