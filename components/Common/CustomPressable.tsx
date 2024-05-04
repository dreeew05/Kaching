import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

type CustomPressableProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean; // Add a disabled prop
};

export default function CustomPressable({
  text,
  onPress,
  disabled,
}: CustomPressableProps) {
  return (
    <TouchableHighlight
      className={`w-2/5 sm:w-1/3 md:w-3/5 lg:w-5/12 self-center rounded-full p-3 ${
        disabled ? 'bg-gray' : 'bg-green'
      }`} // Use the disabled prop to conditionally apply styles
      onPress={disabled ? undefined : onPress} // Prevent onPress if disabled
      disabled={disabled} // Set the disabled prop for accessibility
      underlayColor={disabled ? 'transparent' : '#789c8c'} // Change the underlay color depending on disabled
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        className={`text-white text-xl font-bold self-center ${
          disabled ? 'text-white' : ''
        }`}
      >
        {text}
      </Text>
    </TouchableHighlight>
  );
}
