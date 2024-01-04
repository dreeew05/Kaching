import React from 'react';
import { Pressable, Text, View, TouchableHighlight } from 'react-native';

type CustomPressableProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean; // Add a disabled prop
};

export default function CustomPressable({ text, onPress, disabled }: CustomPressableProps) {
  return (
    <TouchableHighlight
      className={`w-3/5 self-center rounded-full p-3 mb-5 ${disabled ? 'bg-gray' : 'bg-green'}`} // Use the disabled prop to conditionally apply styles
      onPress={disabled ? undefined : onPress} // Prevent onPress if disabled
      disabled={disabled} // Set the disabled prop for accessibility
    >
      <Text className={`text-white text-xl font-bold self-center ${disabled ? 'text-white' : ''}`}>
        {text}
      </Text>
    </TouchableHighlight>
  );
}
