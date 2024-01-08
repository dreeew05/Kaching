import React, { FC } from 'react';
import { View, Pressable, Modal, TouchableOpacity } from 'react-native';
import { Text } from '../Themed';

interface CustomModalProps {
  visible: boolean;
  message: string;
  optionOneText: string;
  optionOnePressed: () => void;
  optionTwoText: string;
  optionTwoPressed: () => void;
  closeModal: () => void;
}

const CustomModal: FC<CustomModalProps> = ({
  visible,
  message,
  optionOneText,
  optionOnePressed,
  optionTwoText,
  optionTwoPressed,
  closeModal,
}) => {
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
          <View className="flex-col rounded-3xl items-center bg-white shadow-sm border-2">
            <Text className="text-center text-xl font-medium py-8">{message}</Text>
            <View className="border-t-[0.5px] border-t-gray-100">
              <View className="flex flex-row ">
                <View className="flex-initial w-44 border-r-[0.25px] border-r-gray-100">
                  <Pressable onPress={optionOnePressed}>
                    <Text className="text-xl text-red-700 text-center py-4">{optionOneText}</Text>
                  </Pressable>
                </View>
                <View className="flex-initial w-44 border-l-[0.25px] border-l-gray-100 py-4">
                  <Pressable onPress={optionTwoPressed}>
                    <Text className="text-xl text-green text-center">{optionTwoText}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomModal;
