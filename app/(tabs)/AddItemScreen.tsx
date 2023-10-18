import React, { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { ItemCard } from '../../components/ItemCard'
import { Image, StyleSheet, Pressable, TextInput, Button} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { launchImageLibraryAsync } from "expo-image-picker";
import { AntDesign } from '@expo/vector-icons';

export default function AddItemScreen(){
  const [text, onChangeText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibraryAsync(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  return (
    <View className="px-4 h-full">
      <View className="flex flex-row mb-3">
        <View className="w-1/5"></View>
        <Text className="w-3/5 text-center text-xl font-bold">
          Add Item
        </Text>
        <Pressable className="w-1/5">
          <View className="flex flex-row align-middle justify-center">
            <Text className="text-center text-base mx-1 text-gray">
              Save
            </Text>
          <FontAwesome name="save" size={20} color="black" />
          </View>
          </Pressable>
      </View>
      <View className="mb-6">
      <Text className="text-extrabold text-lg text-gray">
        Product's Name
      </Text>
      <TextInput
        className="text-light border-b-[0.5px]"
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter product name"
      />
      </View>
      <View className="mb-6">
      <Text className="text-extrabold text-lg text-gray">
        Price
      </Text>
      <TextInput
        className="text-light border-b-[0.5px]"
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter product price"
      />
      </View>
      <View className="mb-6">
      <Text className="text-extrabold text-lg text-gray">
        Product Information
      </Text>
      <TextInput
        className="text-light border-b-[0.5px] text-gray"
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter product information"
      />
      </View>
      <View className="mb-6 w-24">
      <Text className="text-extrabold text-lg text-gray mt-3 mb-6">
        Logo store
      </Text>
      <Pressable className="h-24 bg-gray rounded-3xl justify-center items-center"
        onPress={openImagePicker}>
        <AntDesign name="pluscircle" size={24} color="black" />
        <Text className="text-center text-light mt-1">Add photos</Text>
      </Pressable>
      </View>

    </View>
  );
};