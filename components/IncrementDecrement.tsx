import { useContext } from "react";
import { CounterContext, IncrementDecrementProps } from "../context/IncrementDecrementContext";
import { Pressable, View, Text } from "react-native";

interface IncrementDecrementArgumentProps {
    price : number
}

export default function IncrementDecrement({price} : IncrementDecrementArgumentProps) {
    const {quantity, incrementQuantity, decrementQuantity} = useContext(CounterContext) as IncrementDecrementProps;

    const subTotalPrice = price * quantity;
    return(
        <View className="flex flex-row absolute inset-x-0 bottom-0 w-full border-gray-300 items-left py-2">
            <View className="w-2/5">
                {/* <Text className="text-lg font-semibold text-green">{name}</Text>
                <Text className="text-md text-gray ">{category}</Text> */}
                <Text className=" text-gray">${price}</Text>
                <Text className="text-gray-500">${subTotalPrice}</Text>
                <View className="w-32 h-10 border-[0.5px] 
                    flex flex-row rounded-md items-center justify-center"
                >
                    <Pressable className="border-r-[0.5px]" 
                        onPress={decrementQuantity}
                    >
                        <Text className="text-lg px-4">-</Text>
                    </Pressable>
                    <Text className="text-lg px-4">{quantity}</Text>
                    <Pressable className="border-l-[0.5px]" 
                        onPress={incrementQuantity}
                    >
                        <Text className="px-4 text-lg">+</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )

}