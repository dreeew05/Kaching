
import React, {ReactNode, FC, useState} from 'react';
import { ScrollView, View, Pressable, Modal } from 'react-native';
import { Text } from './Themed'
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-native-fontawesome'


export default function PopUpModal(){
  const [modalVisible, setModalVisible] = useState(false);

  return(
    <View className="flex-1 justify-center items-center">
    <Modal
    animationType="fade"
    transparent={true}
     visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="flex-1 justify-center items-center">
          <View className="flex-col rounded-3xl items-center bg-white shadow-sm border-2">
            <Text className="text-center text-xl font-medium py-8">Item was deleted successfully!</Text>
              <View className="flex flex-row">
                <View className="basis-10/12 py-4 rounded-b-[20px] bg-green">
                  <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text className="text-xl text-white text-center">Continue</Text>
                  </Pressable>
                </View>
          </View>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}>
        <Text>Show Modal</Text>
      </Pressable>
    </View>
    )
}