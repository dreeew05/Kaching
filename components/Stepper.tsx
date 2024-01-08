import { useEffect, useState } from 'react';
import { View, Pressable, Text } from 'react-native';

interface StepperProps {
  id: number;
  quantity: number;
  updateQuantity: (newQuantity: number) => void;
}

export default function Stepper(parentMixIn: StepperProps) {
  const [value, setValue] = useState(parentMixIn.quantity);

  const incrementQuantity = () => {
    setValue(value + 1);
    parentMixIn.updateQuantity(value + 1);
  };

  const decrementQuantity = () => {
    if (value > 0) {
      setValue(value - 1);
      parentMixIn.updateQuantity(value - 1);
    }
  };

  useEffect(() => {
    setValue(parentMixIn.quantity);
  }, [parentMixIn.quantity]);

  return (
    <View
      className="flex flex-row
            border-gray-300 items-left"
    >
      <View>
        <View
          className="w-40 h-10 border-[2px]
                    flex flex-row rounded-md items-center justify-center"
        >
          <Pressable className=" border-r-2" onPress={decrementQuantity}>
            <Text className="text-lg px-5" style={{ fontFamily: 'Poppins-Medium' }}>
              -
            </Text>
          </Pressable>

          <Text className="text-lg px-5" style={{ fontFamily: 'Poppins-Medium' }}>
            {value}
          </Text>

          <Pressable className="border-l-2" onPress={incrementQuantity}>
            <Text className="text-lg px-5" style={{ fontFamily: 'Poppins-Medium' }}>
              +
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
