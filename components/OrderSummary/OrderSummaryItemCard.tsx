import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';


// INTERFACE
import { OrderSummaryProps } from '../interfaces/OrderSummaryProps';

export default function OrderSummaryItemCard(item : OrderSummaryProps) {
    
    return (
        <View className='flex flex-row bg-gray rounded m-3 p-1 justify-between'>
            <Image source ={ item.image } 
            style={{ width: 50, height: 50, marginRight: 10, marginLeft: 2 }} 
            className='rounded border-2 self-center'
            />
            
            <View className='self-center flex-1'>
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-md text-darkgray">${item.totalPrice}</Text>
            </View>
            <Text className="text-lg mr-5 font-base self-center">{item.quantity}</Text>
        
        </View>
    );
}