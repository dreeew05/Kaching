import { useEffect, useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CartItemProps } from '../__utils__/interfaces/CartItemProps';

interface StepperProps {
  id: number;
  quantity: number;
  caseType: string;
  updateQuantity: (newQuantity: number) => void;
}

export default function Stepper(stepperAttrib: StepperProps) {
  useEffect(() => {
    // If the item is added on cart, quantity should not be 0
    if (
      stepperAttrib.caseType === 'cart' &&
      stepperAttrib.quantity == 0
    ) {
      stepperAttrib.updateQuantity(1);
    }
  }, [stepperAttrib.quantity]);

  const incrementQuantity = () => {
    stepperAttrib.updateQuantity(stepperAttrib.quantity + 1);
  };

  const decrementQuantity = () => {
    if (stepperAttrib.quantity > 0) {
      stepperAttrib.updateQuantity(stepperAttrib.quantity - 1);
    }
  };

  const handleTextChange = (val: string) => {
    let defaultValue: number =
      stepperAttrib.caseType === 'cart' ? 1 : 0;
    if (!Number.isNaN(parseInt(val))) {
      stepperAttrib.updateQuantity(parseInt(val));
    } else {
      stepperAttrib.updateQuantity(defaultValue);
    }
  };

  return (
    <View
      className="flex flex-row items-left w-40 h-10 rounded-md items-center
        justify-center border-[1px]"
    >
      <View className="items-center justify-center">
        <Pressable onPress={decrementQuantity}>
          <Text
            className="text-lg px-5"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            -
          </Text>
        </Pressable>
      </View>

      <TextInput
        className="text-lg px-5 border-[1px] h-10 items-center
        justify-center"
        style={{
          fontFamily: 'Poppins-Medium',
          textAlign: 'center',
        }}
        maxLength={3}
        keyboardType="numeric"
        onChangeText={(val) => handleTextChange(val)}
      >
        {stepperAttrib.quantity.toString()}
      </TextInput>

      <Pressable onPress={incrementQuantity}>
        <Text
          className="text-lg px-5"
          style={{ fontFamily: 'Poppins-Medium' }}
        >
          +
        </Text>
      </Pressable>
    </View>
  );
}
