import React, {ReactNode, FC, useState} from 'react';
import { ScrollView, View, Pressable, Modal } from 'react-native';
import { Text } from './Themed'
import { FontAwesomeIcon } from '../node_modules/@fortawesome/react-native-fontawesome'



export default function RemoveItem(){
	return(
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
          )
      }