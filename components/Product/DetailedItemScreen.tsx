import { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { DetailedItemProps } from '../__utils__/interfaces/DetailedItemProps';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/CartRedux/CartSlice';
import { Pressable } from 'react-native';
import Stepper from '../Stepper';
import { RootState } from '../../redux/Store';
import { selectCartItem } from '../../redux/CartRedux/CartSelectors';

export default function DetailedItemScreen(item : DetailedItemProps) {

  const dispatch = useDispatch();
  const itemState = useSelector((state : RootState) => 
      selectCartItem(state, item.id)
  )

  const getStartingQuantity = () => {
      let startingQuantity = 0
      if(itemState != undefined) {
          startingQuantity = itemState.quantity
      }
      return startingQuantity
  }

  const [quantity, setQuantity] = useState(getStartingQuantity);

  const updateQuantity = (quantity : number) => {
      setQuantity(quantity);
  }
  
  const addToCartEvent = () => {
      dispatch(addToCart({
          id : item.id,
          name : item.name,
          price : item.price,
          quantity : quantity,
          image : item.image,
          category : item.category,
      }))
  }

  useEffect(() => {
      if(itemState != undefined) {
          setQuantity(itemState.quantity)
      }
  }, [itemState])

  return(
      <View className="flex-1 h-full relative z-0">
          <View className="h-96 px-3">
                <Image
                    source={
                        {uri : item.image}
                    }
                    className="w-full h-full rounded-3xl"
                />
                <Text className="text-center text-3xl pt-3 text-green">
                    {item.price} PHP
                </Text>
                <Text className="text-center text-4xl pt-3">
                    {item.name}
                </Text>
                <View className="h-36 justify-center items-center">
                    <Text className="text-center text-base text-gray 
                        font-light px-3"
                    >
                        {item.description}
                    </Text>
                </View>
          </View>

          <View className="flex flex-row h-16 absolute inset-x-0
              bottom-0 w-full border-t-[0.5px] border-gray-300 items-left
              py-2 pl-3 "
          >
              <View className="w-2/5">
              
                  <Stepper
                      id={item.id}
                      quantity={quantity}
                      updateQuantity={updateQuantity}
                  />

              </View>

              <View className="w-3/5 pr-3">
                  <Pressable className="w-full h-10 rounded-md
                      items-center justify-center bg-green shadow-md 
                      shadow-neutral-600"
                      onPress={addToCartEvent}
                  >
                      <Text className="text-center text-lg font-semibold 
                          text-white"
                      >
                          Add to Cart
                      </Text>
                  </Pressable>
              </View>

          </View>
      </View>
  )

}