import React, { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { Image, StyleSheet, Pressable, TextInput, Button} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from '@expo/vector-icons';


export default function AddItemScreen(){
  const [name, onChangeName] = useState('');
  const [price, onChangePrice] = useState('');
  const [info, onChangeInfo] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [saveInput, setInput] = useState(false)


  const isAnyInputEmpty = () => {
    console.log("disabled")
    return name === '' || price === ''  || info === '' || !selectedImage;
    };

  const openImagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };


  return (
    <View className="px-4 h-full">
      <View className="flex flex-row mb-3">
        <View className="w-1/5"></View>
        <Text className="w-3/5 text-center text-xl font-bold">
          Add Item
        </Text>
        {
          isAnyInputEmpty() ? (
             <Pressable className="w-1/5">
                <View className="flex flex-row align-middle justify-center">
                  <Text className="text-center text-base mx-1 text-gray">
                    Save
                  </Text>
                  <FontAwesome5 name="file" size={22} color="gray" />
                </View>
              </Pressable>
            ) : (
            <Pressable className="w-1/5" 
                onPress={saveInput}>
                <View className="flex flex-row align-middle justify-center">
                  <Text className="text-center text-base text-orange-400 mx-1">
                    Save
                  </Text>
                  <FontAwesome5 name="file" size={22} color="orange" />
                </View>
            </Pressable>
          )
        }
      </View>
      <View className="mb-6">
      <Text className="text-extrabold text-lg text-gray">
        Product's Name
      </Text>
      <TextInput
        className="text-light border-b-[0.5px]"
        onChangeText={onChangeName}
        value={name}
        placeholder="Enter product name"
        placeholderTextColor="gray"
      />
      </View>
      <View className="mb-6">
      <Text className="text-extrabold text-lg text-gray">
        Price
      </Text>
      <TextInput
        className="text-light border-b-[0.5px]"
        onChangeText={onChangePrice}
        value={price}
        placeholder="Enter product price"
        placeholderTextColor="gray"
        keyboardType="numeric"
      />
      </View>
      <View className="mb-6">
      <Text className="text-extrabold text-lg text-gray">
        Product Information
      </Text>
      <TextInput
        className="text-light border-b-[0.5px]"
        onChangeText={onChangeInfo}
        value={info}
        placeholder="Enter product information"
        placeholderTextColor="gray"
      />
      </View>
      <View className="w-26">
      <Text className="text-bold text-lg text-gray mb-3">
        Product Photo
      </Text>
      {selectedImage ? (
        <Pressable onPress={openImagePicker} className="h-24 w-24 bg-zinc-200 rounded-3xl justify-center items-center shadow-lg shadow-neutral-600">
        <Image 
          className="w-24 h-24 rounded-3xl "
          source={{ uri: selectedImage }}
          resizeMode="contain" />
        </Pressable>
      ) : (
        <Pressable className="h-24 w-24 bg-zinc-200 rounded-3xl justify-center items-center shadow-lg shadow-neutral-600"
        onPress={openImagePicker}>
        <AntDesign name="pluscircle" size={24} color="gray" />
        <Text className="text-center text-light text-zinc-400 mt-1">Add photos</Text>
        </Pressable>
      )}
      </View>
    </View>
  );
};