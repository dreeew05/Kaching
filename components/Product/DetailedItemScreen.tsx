import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { ScrollView, Switch } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { updateData } from '../DatabaseUtils/CoreFunctions';
import ParamsToInteger from '../__utils__/helper/ParamsToInteger';
import { DetailedItemProps } from '../__utils__/interfaces/DetailedItemProps';
import { addToCartEvent } from './AddToCartEvent';
1;

// import { useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectHasStartDay } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import Stepper from '../Common/Stepper';
import { AddToCartModals } from './AddToCartModals';
import { getStartDayStatus } from '../DatabaseUtils/FetchInstructions/GetStartDayStatus';

// Unused imports
// import { RootState } from '../../redux/Store';
// import { selectCartItem } from '../../redux/CartRedux/CartSelectors';

export default function DetailedItemScreen(item: DetailedItemProps) {
  const dispatch = useDispatch();
  // const hasStartDay = useSelector(selectHasStartDay);
  const hasStartDay = getStartDayStatus();

  // Unused [For searching the item in the cart]
  // const itemState = useSelector((state: RootState) =>
  //   selectCartItem(state, item.id),
  // );

  console.log(item.is_available);

  const param = useLocalSearchParams();
  const categoryID: number = ParamsToInteger(param.category_id);

  // Out of Stock Switch
  const [isItemExist, setItemExist] = useState<boolean>(
    item.is_available === 1,
  );

  const [quantity, setQuantity] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showAddQuantityModal, setShowAddQuantityModal] =
    useState<boolean>(false);
  const [showItemInCartModal, setShowItemInCartModal] =
    useState<boolean>(false);
  const [showNeedStartDayModal, setShowNeedStartDayModal] =
    useState<boolean>(false);

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  const toggleSwitch = () => {
    setItemExist(!isItemExist);
  };

  const updateStock = (isAvailable: boolean) => {
    const tableName = 'item';
    const targetAttrib = ['is_available'];
    const targetValue = [isAvailable ? 1 : 0];
    const refAttrib = 'id';
    const refValue = item.id;
    updateData(
      tableName,
      targetAttrib,
      targetValue,
      refAttrib,
      refValue,
    )
      .then((_) => {
        console.log('success');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToCart = () => {
    // Reset quantity to 0
    setQuantity(0);

    console.log(hasStartDay);

    if (hasStartDay) {
      addToCartEvent({
        quantity: quantity,
        // itemState: itemState,
        product: item,
        dispatch: dispatch,
        showAddModal: setShowAddModal,
        showAddQuantityModal: setShowAddQuantityModal,
        showItemInCartModal: setShowItemInCartModal,
      });
    } else {
      setShowNeedStartDayModal(true);
    }
  };

  return (
    <View className="flex-1 h-full relative z-0 bg-white">
      <View className="flex flex-row mb-10">
        <View className="flex flex-row absolute mt-3 right-5 -top-2 items-center justify-center">
          <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 22 }}>
            In Stock
          </Text>
          <Switch
            className="ml-2"
            trackColor={{ false: '#767577', true: '#18573a' }}
            thumbColor={isItemExist ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            onChange={() => updateStock(!isItemExist)}
            value={isItemExist}
            style={{
              transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }],
            }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-3 mt-5">
        <View className="items-center">
          <Image
            source={{ uri: item.image }}
            className="w-64 h-64 rounded-3xl"
            resizeMode="contain"
          />
        </View>
        <Text className="text-center text-4xl pt-3">{item.name}</Text>
        <Text className="text-center text-2xl pt-3 text-green">
          ₱{item.price}
        </Text>
        <View className="px-4 pt-5 pb-20">
          <Text className="text-base text-gray-600 font-light text-center ">
            {item.description}
          </Text>
        </View>
      </ScrollView>

      <View
        className="flex flex-row h-16 absolute inset-x-0
              bottom-0 w-full border-t-[0.5px] space-x-12 border-gray-300 items-center
              py-2 pl-3 bg-white"
      >
        <View className="w-4/12">
          <Stepper
            id={item.id}
            quantity={quantity}
            caseType="product"
            updateQuantity={updateQuantity}
          />
        </View>

        <View className="w-6/12">
          <Pressable
            className="w-full h-10 rounded-lg
                      items-center justify-center shadow-md 
                      shadow-neutral-600"
            style={{
              backgroundColor: isItemExist ? '#18573a' : 'grey',
            }}
            onPress={addToCart}
            disabled={!isItemExist}
          >
            <Text
              className="text-center text-lg font-semibold 
                          text-white"
            >
              Add to Cart
            </Text>
          </Pressable>
        </View>
      </View>

      <AddToCartModals
        isAddModal={showAddModal}
        isAddQuantityModal={showAddQuantityModal}
        isItemInCartModal={showItemInCartModal}
        isNeedStartDayModal={showNeedStartDayModal}
        showAddModal={setShowAddModal}
        showAddQuantityModal={setShowAddQuantityModal}
        showItemInCartModal={setShowItemInCartModal}
        showNeedStartDayModal={setShowNeedStartDayModal}
      />
    </View>
  );
}
