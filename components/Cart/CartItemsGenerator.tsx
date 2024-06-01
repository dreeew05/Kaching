import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../../redux/CartRedux/CartSelectors';
import { clearCart } from '../../redux/CartRedux/CartSlice';
import CustomModal from '../Modals/CustomModal';
import CartItemList from './CartItemList';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function CartItemsGenerator() {
  const cartState = useSelector(selectCart);
  const dispatch = useDispatch();

  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [removeAllModalVisible, setRemoveAllModalVisible] =
    useState(false);
  const [deleteItemModalVisible, setDeleteItemModalVisible] =
    useState(false);
  const [quantityModalVisible, setQuantityModalVisible] =
    useState(false);
  const [checkoutModalVisible, setCheckoutModalVisible] =
    useState(false);

  const goToNextModal = (
    currentModalState: (isVisible: boolean) => void,
    nextModalState: ((isVisible: boolean) => void) | null,
  ) => {
    currentModalState(false);
    if (nextModalState) {
      nextModalState(true);
    }
  };

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
          marginTop: '10%',
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
      <View className="flex-1 bg-white">
        <View className="flex flex-row mt-10 mb-3 bg-white">
          <View className="flex-1 flex-row">
            <Text
              className="text-4xl ml-5 mt-1 text-green"
              style={{ fontFamily: 'Poppins-Bold' }}
            >
              Cart
            </Text>

            <TouchableOpacity
              className="ml-5 bg-white"
              onPress={() => setRemoveAllModalVisible(true)}
            >
              <Entypo
                name="help-with-circle"
                size={35}
                color="#18573a"
              />
            </TouchableOpacity>
          </View>

          <TouchableHighlight
            className={'mr-5 rounded-full p-2 bg-red-500'} // Use the disabled prop to conditionally apply styles
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

        {/* Brute-force [Shit Approach] WAG TULARAN!!! */}
        {/* MODALS */}
        {/* Change Name */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={removeAllModalVisible}
          onRequestClose={() => {
            setRemoveAllModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.32)',
            }}
            onPress={() => setRemoveAllModalVisible(false)}
          >
            <View className="top-[30] flex-row justify-end">
              <View>
                <View className="bg-white ml-3 rounded-md w-[145]">
                  <View className="flex-row justify-end mr-3 py-2">
                    <View className="rounded-full bg-red-500 py-3 px-5">
                      <Text className="text-white text-base font-bold self-center ">
                        Remove All
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="ml-3 mr-3 w-[145]">
                  <View className="flex-row justify-end">
                    <Entypo
                      name={'triangle-up'}
                      size={40}
                      color="white"
                    />
                  </View>
                  <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 mt-[-15]">
                    <Text
                      className="text-black"
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      Clear all items from the cart.
                    </Text>
                  </View>
                  <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
                    <Pressable
                      onPress={() =>
                        goToNextModal(
                          setRemoveAllModalVisible,
                          setDeleteItemModalVisible,
                        )
                      }
                    >
                      <Text
                        className="text-black"
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: 'white',
                        }}
                      >
                        Continue
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Remove Item */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={deleteItemModalVisible}
          onRequestClose={() => {
            setDeleteItemModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.32)',
            }}
            onPress={() => setDeleteItemModalVisible(false)}
          >
            <View className="flex-row justify-end ml-5 mr-3 top-[105]">
              <View>
                <View className="flex-row justify-end">
                  <View className="flex-col">
                    <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 mt-[-15]">
                      <Text
                        className="text-black"
                        style={{
                          fontFamily: 'Poppins-Regular',
                        }}
                      >
                        Clear all items from the cart.
                      </Text>
                    </View>
                    <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
                      <Pressable
                        onPress={() =>
                          goToNextModal(
                            setDeleteItemModalVisible,
                            setQuantityModalVisible,
                          )
                        }
                      >
                        <Text
                          className="text-black"
                          style={{
                            fontFamily: 'Poppins-Regular',
                            color: 'white',
                          }}
                        >
                          Continue
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View className="ml-[-15]">
                    <Entypo
                      name={'triangle-right'}
                      size={40}
                      color="white"
                    />
                  </View>
                </View>
              </View>
              <View className="bg-white ml-1 rounded-md flex-row justify-end pr-3 pl-3 py-3 h-[50]">
                <FontAwesome5
                  name="trash"
                  size={20}
                  color="red"
                  // set color opacity
                  style={{ opacity: 0.7 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Quantity */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={quantityModalVisible}
          onRequestClose={() => {
            setQuantityModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.32)',
            }}
            onPress={() => setQuantityModalVisible(false)}
          >
            <View className="top-[200] right-[50] flex-row justify-end">
              <View className="w-[200]">
                <View className="flex-row justify-center bg-white ml-3 mr-3 rounded-md px-2 h-[80]">
                  <Image
                    source={require('../../assets/icons/Stepper.png')}
                    resizeMode="contain"
                    className="w-full h-full rounded-t-md"
                  />
                </View>

                <View className="ml-3 mr-3">
                  <View>
                    <Entypo
                      name={'triangle-up'}
                      size={40}
                      color="white"
                    />
                  </View>
                  <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 mt-[-15]">
                    <Text
                      className="text-black"
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      Adjust item quantity in cart.
                    </Text>
                  </View>
                  <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
                    <Pressable
                      onPress={() =>
                        goToNextModal(
                          setQuantityModalVisible,
                          setCheckoutModalVisible,
                        )
                      }
                    >
                      <Text
                        className="text-black"
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: 'white',
                        }}
                      >
                        Continue
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Checkout */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={checkoutModalVisible}
          onRequestClose={() => {
            setCheckoutModalVisible(false);
          }}
        >
          <TouchableOpacity
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.32)',
            }}
            onPress={() => setCheckoutModalVisible(false)}
          >
            <View className="flex-1 items-center">
              <View className="flex-1 justify-end bottom-[60] w-[300]">
                <View className="ml-3 mr-3">
                  <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 ">
                    <Text
                      className="text-black"
                      style={{
                        fontFamily: 'Poppins-Regular',
                      }}
                    >
                      Proceed to checkout.
                    </Text>
                  </View>
                  <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
                    <Pressable
                      onPress={() =>
                        goToNextModal(setCheckoutModalVisible, null)
                      }
                    >
                      <Text
                        className="text-black"
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: 'white',
                        }}
                      >
                        Okay
                      </Text>
                    </Pressable>
                  </View>
                  <View className="flex flex-row justify-center mt-[-13]">
                    <Entypo
                      name={'triangle-down'}
                      size={40}
                      color="white"
                    />
                  </View>
                </View>

                <View className="bg-white ml-3 mr-3 rounded-md py-3 items-center">
                  <View className="py-3 px-7 bg-green rounded-full w-[150] items-center">
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      Checkout
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
