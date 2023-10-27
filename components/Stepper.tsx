import { useState } from "react";
import { View, Pressable, Text } from "react-native";

interface StepperProps {
    updateQuantity : (newQuantity : number) => void;
}

export default function Stepper(parentQuantity : StepperProps) {

    const [value, setValue] = useState(0);

    const incrementQuantity = () => {
        setValue(value + 1);
        parentQuantity.updateQuantity(value + 1);
    }

    const decrementQuantity = () => {
        if(value > 0) {
            setValue(value - 1);
            parentQuantity.updateQuantity(value - 1);
        }
    }

    return(
        <View className="flex flex-row
            border-gray-300 items-left">

            <View>
                <View className="w-40 h-10 border-[0.5px]
                    flex flex-row rounded-md items-center justify-center">

                    <Pressable className="border-r-[0.5px]"
                        onPress={decrementQuantity}
                    >
                        <Text className="text-lg px-5" 
                            style={{fontFamily : 'Poppins-Medium'}}>
                                -
                        </Text>
                    </Pressable>

                    <Text className="text-lg px-5"
                        style={{fontFamily : 'Poppins-Medium'}}>
                        {value}
                    </Text>

                    <Pressable className="border-l-[0.5px]"
                        onPress={incrementQuantity}
                    >
                        <Text className="text-lg px-5"
                            style={{fontFamily: 'Poppins-Medium'}}>
                            +
                        </Text>
                    </Pressable>

                </View>
            </View>

        </View>
    )

}