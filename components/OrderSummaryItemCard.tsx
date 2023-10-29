import React, { useState } from 'react';
import { Alert, Image, View, Text, Pressable, ImageSourcePropType } from 'react-native';


// INTERFACE
import { CartProps } from './interfaces/CartItemProps';

export default function OrderSummaryItemList({ price, name, image, category, quantity } : CartProps ) {

    const subTotalPrice = price * quantity;
    
    return (
        <View className='flex flex-row bg-gray rounded m-3 p-1 justify-between'>
            <Image source ={ image } 
            style={{ width: 50, height: 50, marginRight: 10, marginLeft: 2 }} 
            className='rounded border-2 self-center'
            />
            
            <View className='self-center flex-1'>
                <Text className="text-lg font-semibold">{name}</Text>
                <Text className="text-md text-darkgray">${price}</Text>
            </View>
            <Text className="text-lg mr-5 font-base self-center">{quantity}</Text>
            
            <View className='justify-end self-center w-24 mr-1'>
                <Text className="text-lg text-right">${subTotalPrice}</Text>
            </View>
        </View>
    );
}