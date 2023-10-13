import React, { useState } from 'react';
import { Alert, Image, View, Text, Pressable } from 'react-native';

type Item = {
    id: number;
    name: string;
    price: number;
    image: string;
};

type itemCardProps = {
    item: Item;
};

export default function ItemCard({ item }: itemCardProps) {
    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
        setQuantity(quantity - 1);
        }
    };

    const addToCart = () => {
        Alert.alert('Show Alert Action', 'This is a dummy action.');
    };
    
    return (
        <View className="flex flex-row p-2 border-b-2 border-gray-300">
            <Image
            source={{ uri: item.image }}
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
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-500">${item.price}</Text>
        </View>
        <Pressable className="bg-transparent w-20 h-8 border-2 border-green rounded-md px-4 self-center " onPress={addToCart}>
            <Text className="text-green text-lg text-center">Add to Cart</Text>
        </Pressable>
        </View>
    );
}
