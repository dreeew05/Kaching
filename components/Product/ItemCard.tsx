import React, { useEffect, useState } from 'react';
import { Image, View, Text, Pressable, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { selectCartItem } from '../../redux/CartRedux/CartSelectors';
import Stepper from '../Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/CartRedux/CartSlice';
import { RootState } from '../../redux/Store';

type Item = {
  id: number;
  name: string;
  price: number;
  image: ImageSourcePropType;
};

type itemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: itemCardProps) {
  const dispatch = useDispatch();
  const itemState = useSelector((state: RootState) => selectCartItem(state, item.id));

  const [quantity, setQuantity] = useState(0);

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  const addToCartEvent = () => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        image: item.image,
        category: 'Test Category',
      }),
    );
  };

  useEffect(() => {
    if (itemState != undefined) {
      setQuantity(itemState.quantity);
    }
  }, [itemState]);

  return (
    <View className="ml-3 mr-3 mb-5">
      <View className="flex flex-row mb-3">
        <Link
          href={{
            pathname: '/(tabs)/ItemScreen',
            params: { id: item.id },
          }}
          asChild
        >
          <TouchableOpacity>
            <Image className="w-40 h-40 mr-1 rounded-md" source={item.image} />
          </TouchableOpacity>
        </Link>

        <View className="flex flex-column ml-5">
          <Text className="text-lg font-semibold" style={{ fontFamily: 'Poppins-Medium' }}>
            {item.name}
          </Text>
          <Text className="text-gray-500" style={{ fontFamily: 'Poppins-Regular' }}>
            P{item.price}
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center">
        <View className="flex items-center">
          <Stepper id={item.id} quantity={quantity} updateQuantity={updateQuantity} />
        </View>
        <View className="flex-1 justify-center">
          <Pressable
            className="bg-green w-52 h-10 border-2 border-green 
                        rounded-md self-center ml-6 flex-1 items-center justify-center"
            onPress={addToCartEvent}
          >
            <Text className="text-white text-lg" style={{ fontFamily: 'Poppins-Bold' }}>
              Add to Cart
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
