import React, { useState } from 'react';
import { Alert, Image, View, Text, Pressable, ImageSourcePropType } from 'react-native';


// INTERFACE
import { CartProps } from './interfaces/CartProps';

export default function CartItemCard({ price, name, image, category, quantity } : CartProps) {

    // const [quantity, setQuantity] = useState(2);

    const incrementQuantity = () => {
        quantity += 1;
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            quantity -= 1;
        }
    };

    const removeFromCart = () => {
        Alert.alert('Show Alert Action', 'This is a dummy action.');
    };
    
    return (
        <View className="flex p-2">
            <Pressable className="bg-transparent w-20 h-8 border-2 border-green rounded-md px-4 self-center " onPress={removeFromCart}>
                <Text className="text-green text-lg text-center">remove</Text>
            </Pressable>
            <Image
            source={ image }
            style={{ width: 80, height: 80, marginRight: 10 }}
            />

            <View className="w-1/3 flex flex-row items-center">
                <Pressable className="p-2 border border-gray-300 rounded-md" onPress={decrementQuantity}>
                    <Text className="text-lg">-</Text>
                </Pressable>
                <Text className="p-2 text-lg">{quantity}</Text>
                <Pressable className="p-2 border border-gray-300 rounded-md" onPress={incrementQuantity}>
                    <Text className="text-lg">+</Text>
                </Pressable>
            </View>

            <View className="flex-1">
                <Text className="text-lg font-semibold">{name}</Text>
                <Text className="text-lg font-semibold">{category}</Text>
                <Text className="text-gray-500">${price}</Text>
            </View>
        </View>
    );
}