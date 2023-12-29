import React from 'react';
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import TermsOfService from './(tabs)/termsOfService';

const TermsAndConditionsScreen = ({ visible, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className={'w-max h-max justify-center items-center '}>
        <ScrollView className={' p-5 bg-white rounded-2xl '}>
          <TermsOfService />
        </ScrollView>
        <Pressable
          className={`w-3/5 self-center rounded-full p-3 bg-green mb-28 mt-5`}
          onPress={onClose}
        >
          <Text className={`text-white text-xl font-bold self-center `}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default TermsAndConditionsScreen;
