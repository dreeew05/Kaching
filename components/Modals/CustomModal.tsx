import React, { FC } from 'react';
import {
  View,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Text } from '../Themed';
import { useRouter } from 'expo-router';
import { CustomModalProps } from '../__utils__/interfaces/CustomModalProps';

const CustomModal: FC<CustomModalProps> = ({
  visible,
  message,
  optionOneText,
  optionOnePressed,
  optionTwoText,
  optionTwoPressed,
  optionTwoColor,
  closeModal,
}) => {
  const router = useRouter();

  const generateButton = () => {
    // Todo: Fix UI of the buttons
    if (optionTwoText != 'null') {
      return (
        <View className="flex flex-row">
          <View className="flex-initial w-32 border-r-[0.25px] border-r-gray-100">
            <Pressable onPress={optionOnePressed}>
              <Text className="text-xl text-blue-500 text-center py-4">
                {optionOneText}
              </Text>
            </Pressable>
          </View>
          <View className="flex-initial w-32 border-l-[0.75px] border-l-gray-100 py-4">
            <Pressable onPress={optionTwoPressed}>
              {optionTwoColor === 'red' ? (
                <Text className="text-xl text-red-500 text-center w">
                  {optionTwoText}
                </Text>
              ) : (
                <Text className="text-xl text-blue-500 text-center">
                  {optionTwoText}
                </Text>
              )}
            </Pressable>
          </View>
        </View>
      );
    } else {
      return (
        <View className="w-40  border-r-gray-100">
          <Pressable onPress={optionOnePressed}>
            <Text className="text-xl text-blue-500 text-center py-4">
              {optionOneText}
            </Text>
          </Pressable>
        </View>
      );
    }
  };

  return (
    <Modal
      className="flex-1 justify-center items-center"
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.32)',
        }}
        onPress={closeModal}
      >
        <View className="flex-1 justify-center items-center">
          <View className="flex-col rounded-3xl items-center bg-white">
            <Text
              className="text-center text-lg font-medium py-7 px-3 w-52"
              style={{ fontFamily: 'Poppins-Medium' }}
            >
              {message}
            </Text>
            <View className="border-t-[1px] border-t-gray-100">
              {generateButton()}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;
