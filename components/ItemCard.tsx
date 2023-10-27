import React, { useState } from 'react';
import { Alert, Image, View, Text, Pressable, ImageSourcePropType } from 'react-native';

// COMPONENTS
import Stepper from './Stepper';

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
    const [quantity, setQuantity] = useState(0);

    const updateQuantity = (quantity : number) => {
        setQuantity(quantity);
    }

    const addToCart = () => {
        Alert.alert('Show Alert Action', 'This is a dummy action.');
    };
    
    return (
        // <View className="flex flex-row p-2 border-b-2 border-gray-300">
        <View className='ml-3 mr-3 mb-5'>
            <View className='flex flex-row mb-3'>
                <Image
                className="w-40 h-40 mr-1 rounded-md"
                source={ item.image }
                />
                <View className='flex flex-column ml-5'>
                    <Text className="text-lg font-semibold"
                        style={{ fontFamily: 'Poppins-Medium'}}
                    >
                        {item.name}
                    </Text>
                    <Text className="text-gray-500"
                        style={{ fontFamily: 'Poppins-Regular' }}
                    >
                        P{item.price}
                    </Text>
                </View>
            </View>

            <View className='flex flex-row items-center'>
                <View className="flex items-center">
                    <Stepper updateQuantity={updateQuantity}/>
                </View>
                <View className='flex-1 justify-center'>
                    <Pressable className="bg-green w-52 h-10 border-2 border-green 
                        rounded-md self-center ml-6 flex-1 items-center justify-center" 
                        onPress={addToCart}>

                        <Text className="text-white text-lg"
                            style={{fontFamily: 'Poppins-Bold'}}>
                            Add to Cart
                        </Text>
                        
                    </Pressable>
                </View>
            </View>
        </View>
        
    );
}
