import React from 'react';
import { ScrollView, View } from 'react-native';

// CONSTANT DATA
import constantProducts from '../constants/Products';

// COMPONENT
import CartItemCard from './CartItemCard';

// INTERFACE
import { CartProps } from './interfaces/CartProps';
import OrderSummaryItemList from './OrderSummaryItemCard';

interface CartListProps {
    items : CartProps[]
}

const CartItemList : React.FC<CartListProps> = ({ items }) => {
    return(
        <ScrollView>
            <View className='flex flex-row flex-wrap my-2 mx-auto'>
                {items.map((item) => {
                    item.image = constantProducts[item.id]
                    return(
                        <View className='w-1/2 ' key={item.id}>
                            <OrderSummaryItemList
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                category={item.category}
                                quantity={item.quantity}
                                price={item.price}
                            />
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default CartItemList;
