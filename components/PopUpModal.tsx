import React, {ReactNode, FC, useState} from 'react';
import { ScrollView, View, Pressable, Modal } from 'react-native';
import { Text } from './Themed'
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-native-fontawesome'

interface PopUpProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmDelete: ReactNode;
  nowDeleted: ReactNode;
}


const ReusableModal: FC<ReusableModalProps> = ({ visible, onClose, onConfirm, confirmDelete, nowDeleted }) => {
  return(
    <View className="flex-1 justify-center items-center">
      <Modal className="bg-green"
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
          <View className="flex-1 justify-center items-center">
            <View className="flex-col rounded-[35px] items-center bg-white shadow-sm">
              {confirmDelete}
            </View>
          </View>
      </Modal>
    </View>
    )
}



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
            <Text className="text-center text-xl font-medium py-8">Remove Item?</Text>
            <View className="border-t-[0.5px] border-t-gray-100">
              <View className="flex flex-row ">
                <View className="flex-initial w-44 border-r-[0.25px] border-r-gray-100">
                  <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text className="text-xl text-red-700 text-center py-4">Cancel</Text>
                  </Pressable>
                </View>
                <View className="flex-initial w-44 border-l-[0.25px] border-l-gray-100 py-4">
                  <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text className="text-xl text-green text-center">Yes</Text>
                  </Pressable>
                </View>
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

