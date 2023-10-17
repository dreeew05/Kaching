import React, { useState } from 'react';
import { Alert, Image, View, Text, Pressable, ImageSourcePropType } from 'react-native';


// INTERFACE
import { CartProps } from './interfaces/CartProps';

export default function OrderSummaryItemList({ price, name, image, category, quantity } : CartProps ) {

    const subTotalPrice = price * quantity;
    
    return (
        <View className='flex flex-row bg-gray rounded'>
            <Image source ={ image } 
            style={{ width: 40, height: 40, marginRight: 10 }} 
            className='rounded border-2 '
            />
            
            <View>
                <Text className="text-lg font-semibold">{name}</Text>
                <Text className="text-lg ">{price}</Text>
            </View>
            <Text className="text-gray-500">{quantity}</Text>
            <Text className="text-gray-500">${subTotalPrice}</Text>
        </View>
    );
}