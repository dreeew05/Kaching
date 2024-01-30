import { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

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

  const handleTextChange = (val : string) => {
    if(!Number.isNaN(parseInt(val))) {
      setValue(parseInt(val));
      parentMixIn.updateQuantity(parseInt(val));
    }
    else {
      setValue(1);
      parentMixIn.updateQuantity(1);
    }
  }

  return (
    <View
      className="flex flex-row items-left w-40 h-10 rounded-md items-center
        justify-center border-[1px]"
    >
      <View className='items-center justify-center'>
        <Pressable onPress={decrementQuantity}>
        <Text className="text-lg px-5" style={{ fontFamily: 'Poppins-Medium' }}>
            -
          </Text>
        </Pressable>
      </View>

      <TextInput className="text-lg px-5 border-[1px] h-10 items-center
        justify-center" 
        style={{ 
          fontFamily: 'Poppins-Medium', 
          textAlign: 'center',
        }}
        maxLength={3}
        keyboardType='numeric'
        onChangeText={(val) => handleTextChange(val)}
      >
        {value}
      </TextInput>

      <Pressable onPress={incrementQuantity}>
        <Text className="text-lg px-5" style={{ fontFamily: 'Poppins-Medium' }}>
          +
        </Text>
      </Pressable>

    </View>
  );
}
