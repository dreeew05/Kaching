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
  optionOneColor,
  optionTwoText,
  optionTwoPressed,
  optionTwoColor,
  closeModal,
}) => {
  const router = useRouter();

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
            <View
              style={{
                borderColor: 'grey',
                borderTopWidth: 0.75,
              }}
            >
              <View className="flex flex-row">
                <View
                  className="flex-initial w-32"
                  style={{
                    borderColor: 'grey',
                    borderRightWidth: 0.25,
                  }}
                >
                  <Pressable onPress={optionOnePressed}>
                    {optionOneColor === 'red' ? (
                      <Text className="text-xl text-red-500 text-center py-4">
                        {optionOneText}
                      </Text>
                    ) : (
                      <Text className="text-xl text-blue-500 text-center py-4">
                        {optionOneText}
                      </Text>
                    )}
                  </Pressable>
                </View>
                <View
                  className="flex-initial w-32"
                  style={{
                    borderColor: 'grey',
                    borderLeftWidth: 0.25,
                  }}
                >
                  <Pressable onPress={optionTwoPressed}>
                    {optionTwoColor === 'red' ? (
                      <Text className="text-xl text-red-500 text-center py-4">
                        {optionTwoText}
                      </Text>
                    ) : (
                      <Text className="text-xl text-blue-500 text-center py-4">
                        {optionTwoText}
                      </Text>
                    )}
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
