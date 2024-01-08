import React, { useEffect, useState } from 'react';
import { Image, View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { selectCartItem } from '../../redux/CartRedux/CartSelectors';
import Stepper from '../Stepper';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/CartRedux/CartSlice';
import { RootState } from '../../redux/Store';
import { BaseItemProps } from '../__utils__/interfaces/BaseItemProps';
import { addProductAction, setIsEditComponent, setSpecificProductAction } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { deleteData } from '../DatabaseUtils/CoreFunctions';

type itemCardProps = {
  item: BaseItemProps;
  isEditComponent : boolean
};

export default function ItemCard(item: itemCardProps) {
  const dispatch = useDispatch();
  const itemState = useSelector((state: RootState) => selectCartItem(
    state, item.item.id
  ));

  const [quantity, setQuantity] = useState(0);

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  const addToCartEvent = () => {
    if(quantity > 1) {
      dispatch(addToCart({
          id : item.item.id,
          name : item.item.name,
          price : item.item.price,
          quantity : quantity,
          image : item.item.image,
          category : item.item.category,
      }))
    }
}

  useEffect(() => {
    if (itemState != undefined) {
      setQuantity(itemState.quantity);
    }
  }, [itemState]);

  const deleteProduct = (id : number) => {
    const tableName : string = 'item';
    const refAttribute : string = 'id';

    deleteData(tableName, refAttribute, id)
      .then((result) => {
        dispatch(
          addProductAction('delete')
        )
        dispatch(
          setSpecificProductAction({
            id : 0,
            action : 'delete'
          })
        )
      })
      dispatch(
        setIsEditComponent(true)
      )
  }

  const editProduct = () => {
    dispatch(
      setIsEditComponent(true)
    )
  }

  return (
    <View className="ml-3 mr-3 mb-5">
      <View className="flex flex-row mb-3">
        <Link
          href={{
            pathname: '/(tabs)/ItemScreen',
            params: { id: item.item.id },
          }}
          asChild
        >
          <TouchableOpacity>
            <Image className="w-40 h-40 mr-1 rounded-md" 
              source={{uri:item.item.image}} 
            />
          </TouchableOpacity>
        </Link>

        <View className="flex flex-column ml-5">
          <Text className="text-lg font-semibold" style={{ fontFamily: 'Poppins-Medium' }}>
            {item.item.name}
          </Text>
          <Text className="text-gray-500" style={{ fontFamily: 'Poppins-Regular' }}>
            P{item.item.price}
          </Text>
        </View>
      </View>

      {item.isEditComponent ? (
        <View className="flex flex-row items-center">
          <View className="flex items-center">
            <Stepper id={item.item.id} quantity={quantity} updateQuantity={updateQuantity} />
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
        ) :
        (
          <View className="flex flex-row items-center">
            <View className="flex flex-row justify-center">
              <Link
                href={{
                  pathname : '/(tabs)/editItemScreen',
                  params: {
                    id : item.item.id,
                  }
                }}
                asChild
              >
                <Pressable
                  className="bg-green h-10 border-2 border-green  mr-2
                              rounded-md self-center flex-1 items-center justify-center"
                  onPress={() => editProduct()}
                >
                  <Text className="text-white text-lg" style={{ fontFamily: 'Poppins-Bold' }}>
                    Edit Product
                  </Text>
                </Pressable>
              </Link>
              <Pressable
                className="bg-red-500 h-10 border-2 border-red-500 ml-2
                            rounded-md self-center flex-1 items-center justify-center"
                onPress={() => deleteProduct(item.item.id)}
              >
                <Text className="text-white text-lg" 
                  style={{ fontFamily: 'Poppins-Bold' }}
                >
                  Delete Product
                </Text>
              </Pressable>
            </View>
          </View>
        )
      }
    </View>
  );
}
