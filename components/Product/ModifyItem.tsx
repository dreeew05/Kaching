import React, { useEffect, useState } from 'react';
import { Text, View } from '../Themed';
import { Image, Pressable, TextInput } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import CustomModal from '../Modals/CustomModal';
import { useDispatch } from 'react-redux';
import { insertData, selectData, updateData } from '../DatabaseUtils/CoreFunctions';
import { addProductAction, addSpecificProductAction } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { Link, useRouter } from 'expo-router';

interface ModifyItemProps {
    type : string
    id : number
}

export default function ModifyItem(data : ModifyItemProps) {

    const [name, onChangeName] = useState<string>('');
    const [price, onChangePrice] = useState<string>();
    const [info, onChangeInfo] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const [saveModalVisible, setSaveModalVisible] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if(data.type == 'add') {
            clearData();
        }
        else {
            const tableName = 'item';
            const column = ['*'];
            const targetAttrib = 'id';

            selectData(tableName, column, targetAttrib, data.id)
                .then((result) => {
                    onChangeName(result[0].name)
                    onChangePrice((result[0].price).toString())
                    onChangeInfo(result[0].description)
                    setSelectedImage(result[0].image)
                })
        }
    }, [data.id])

    const closeModal = () => {
        setModalVisible(false);
    };

    const closeSaveModal = () => {
        setSaveModalVisible(false);
    }

    const openCamera = () => {
        openImagePicker('camera');
        closeModal();
    };
    const openGallery = () => {
        openImagePicker('gallery');
        closeModal();
    };

    const isAnyInputEmpty = () => {
        return name === '' || price === '' || info === '' || !selectedImage;
    };

    const openImagePicker = async (mode: string) => {
        // No permissions request is necessary for launching the image library
        let result: ImagePicker.ImagePickerResult;
        if (mode == 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            }
        }
        if (mode == 'gallery') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            }
        }
        
    };

    const clearData = () => {
        onChangeName('');
        onChangePrice('');
        onChangeInfo('');
        setSelectedImage('');
    }

    const saveProduct = () => {
        if(data.type == 'add') {
            const tableName = 'item';
            const product = [{
                name : name,
                price : price,
                category_id : data.id,
                description : info,
                image : selectedImage
            }]
            
            insertData(tableName, product)
                .then((result) => {
                    dispatch(
                        addProductAction('add')
                    )
                })
                .catch((error) => {
                    console.log(error)
                
                })
                router.push('/')
        }
        else {
            const tableName = 'item';
            const refAttrib = 'id';
            const refValue = data.id;
            const targetAttrib = 'name';
            const targetAttribValue = name;
            const targetAttrib2 = 'price';
            const targetAttribValue2 = price;
            const targetAttrib3 = 'description';
            const targetAttribValue3 = info;
            const targetAttrib4 = 'image';
            const targetAttribValue4 = selectedImage;

            updateData(tableName, targetAttrib, targetAttribValue,
                refAttrib, refValue)
            updateData(tableName, targetAttrib2, targetAttribValue2,
                refAttrib, refValue)
            updateData(tableName, targetAttrib3, targetAttribValue3,
                refAttrib, refValue)
            updateData(tableName, targetAttrib3, targetAttribValue3,
                refAttrib, refValue)
            updateData(tableName, targetAttrib4, targetAttribValue4,
                refAttrib, refValue)
            dispatch(
                addProductAction('edit') 
            )
        }
        closeSaveModal();
        dispatch(
            addSpecificProductAction('edit')
        );
        clearData();
    }

    return (
        <View>
            <View style={{ marginTop: 60 }}>   
                <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: 10, 
                }}>
                    <Link
                        href={{
                        pathname: '/(tabs)/categoryView',
                        params: {
                            id: data.id,
                        },
                        }}
                        asChild
                    >
                        <Pressable className="ml-3">
                        <Ionicons name="chevron-back" size={30} color="green" />
                        </Pressable>
                    </Link>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {data.type === 'add' ? (
                        <Text className="text-center text-xl w-4/5 text-green" style={{ fontFamily: 'Poppins-Bold' }}>
                            Add Item
                        </Text>
                        ) : (
                        <Text className="text-center text-xl font-bold">Edit Item</Text>
                        )}
                    </View>

                    {isAnyInputEmpty() ? (
                    <View className="flex flex-row justify-center mr-5">
                        <FontAwesome5 name="file" size={22} color="gray" />
                    </View>
                    ) : (
                    <View className="flex flex-row justify-center mr-5">
                        <Pressable onPress={() => setSaveModalVisible(true)}>
                            <FontAwesome5 name="file" size={22} 
                                color="orange" 
                            />
                        </Pressable>
                    </View>
                    )}
                </View>

            <View className="px-5 h-full">
                
                <View className="mb-6 mt-7">
                    <Text className="text-extrabold text-lg text-gray">Product's Name</Text>
                    <TextInput
                    className="text-light border-b-[1.5px] border-zinc-500"
                    onChangeText={onChangeName}
                    value={name}
                    placeholder="Enter product name"
                    placeholderTextColor="gray"
                    />
                </View>
                <View className="mb-6">
                    <Text className=" mt-3 text-extrabold text-lg text-gray">Price</Text>
                    <TextInput
                        className="text-light border-b-[1.5px] border-zinc-500"
                        onChangeText={onChangePrice}
                        value={price}
                        placeholder="Enter product price"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                    />
                </View>
                <View className="mb-6">
                    <Text className=" mt-3 text-extrabold text-lg text-zinc-600">Product Information</Text>
                    <TextInput
                        className="text-light border-b-[1.5px] border-zinc-500"
                        onChangeText={onChangeInfo}
                        value={info}
                        placeholder="Enter product information"
                        placeholderTextColor="gray"
                    />
                </View>
                <View className="w-26">
                    <Text className=" mt-3 text-bold text-lg text-gray mb-3">Product Photo</Text>
                    {selectedImage ? (
                    <Pressable
                        onPress={() => setModalVisible(true)}
                        className="h-24 w-24 bg-zinc-200 rounded-3xl justify-center items-center shadow-lg shadow-neutral-600"
                    >
                        <Image
                        className="w-24 h-24 rounded-3xl "
                        source={{ uri: selectedImage }}
                        resizeMode="contain"
                        />
                    </Pressable>
                    ) : (
                    <Pressable
                        className="h-24 w-24 bg-zinc-200 rounded-3xl justify-center items-center shadow-lg shadow-neutral-600"
                        onPress={() => setModalVisible(true)}
                    >
                        <AntDesign name="pluscircle" size={24} color="gray" />
                        <Text className="text-center text-light text-zinc-400 mt-1">Add photos</Text>
                    </Pressable>
                    )}

                    <CustomModal
                        visible={modalVisible}
                        message="Choose an option"
                        optionOneText="Gallery"
                        optionTwoText="Camera"
                        optionOnePressed={openGallery}
                        optionTwoPressed={openCamera}
                        optionTwoColor='blue'
                        closeModal={closeModal}
                    />

                    <CustomModal
                        visible={saveModalVisible}
                        message="Save item?"
                        optionOneText="Yes"
                        optionTwoText="No"
                        optionOnePressed={() => saveProduct()}
                        optionTwoPressed={() => setSaveModalVisible(false)}
                        optionTwoColor='red'
                        closeModal={() => closeSaveModal()}
                    /> 

                    </View>
                </View>
            </View>
        </View>
    )

}