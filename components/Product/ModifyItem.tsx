import React, { useEffect, useState } from 'react';
import { Text, View } from '../Themed';
import { Image, Pressable, TextInput } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import CustomModal from '../Modals/CustomModal';
import {
  insertData,
  selectData,
  updateData,
} from '../DatabaseUtils/CoreFunctions';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import {
  setIsCategoryViewProductLoading,
  setProductModifiedActions,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';
import ParamsToInteger from '../__utils__/helper/ParamsToInteger';
import { PopUpModal } from '../Modals/PopUpModal';

type ModifyItemProps = {
  type: string;
};

export default function ModifyItem({ type }: ModifyItemProps) {
  const [categoryID, setCategoryID] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>();
  const [info, setInfo] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] =
    useState(false);

  const param = useLocalSearchParams();
  const id = ParamsToInteger(param.id);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (type == 'add') {
      clearData();
    } else {
      const tableName = 'item';
      const column = ['*'];
      const targetAttrib = 'id';

      selectData(tableName, column, targetAttrib, id).then(
        (result) => {
          // Todo: Bad Logic!
          // Todo: Do Database Normalization
          // setCategoryID(result[0].categoryID);
          setName(result[0].name);
          setPrice(result[0].price.toString());
          setInfo(result[0].description);
          setSelectedImage(result[0].image);
        },
      );
    }
  }, [id]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeSaveModal = () => {
    setSaveModalVisible(false);
  };

  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  const openCamera = () => {
    openImagePicker('camera');
    closeModal();
  };
  const openGallery = () => {
    openImagePicker('gallery');
    closeModal();
  };

  const isAnyInputEmpty = () => {
    return (
      name === '' || price === '' || info === '' || !selectedImage
    );
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
    setName('');
    setPrice('');
    setInfo('');
    setSelectedImage('');
  };

  const saveProduct = () => {
    if (type == 'add') {
      const tableName = 'item';
      const product = [
        {
          name: name,
          price: price,
          category_id: id,
          description: info,
          image: selectedImage,
        },
      ];

      insertData(tableName, product)
        .then((result) => {
          // Todo: Add success message
        })
        .catch((error) => {
          console.log(error);
        });
      router.push('/');
    } else {
      const tableName = 'item';
      const targetAttrib = ['name', 'price', 'description', 'image'];
      const targetValue = [name, price, info, selectedImage];
      const refAttrib = 'id';
      const refValue = id;

      updateData(
        tableName,
        targetAttrib,
        targetValue,
        refAttrib,
        refValue,
      )
        .then((result) => {
          dispatch(setProductModifiedActions('update'));
          dispatch(setIsCategoryViewProductLoading(true));
          // Todo: Add success message
        })
        .catch((error) => {
          // Todo: Add error message
        });
    }
    closeSaveModal();
    setSuccessModalVisible(true);
    clearData();
    dispatch(setIsCategoryViewProductLoading(true));
  };

  return (
    <View>
      <View style={{ marginTop: 60 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Link
            href={{
              pathname: '/(tabs)/categoryView',
              params: {
                id: id,
              },
            }}
            asChild
          >
            <Pressable className="ml-3">
              <Ionicons name="chevron-back" size={30} color="green" />
            </Pressable>
          </Link>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {type === 'add' ? (
              <Text
                className="text-center text-xl w-4/5 text-green"
                style={{ fontFamily: 'Poppins-Bold' }}
              >
                Add Item
              </Text>
            ) : (
              <Text className="text-center text-xl font-bold">
                Edit Item
              </Text>
            )}
          </View>

          {isAnyInputEmpty() ? (
            <View className="flex flex-row justify-center mr-5">
              <FontAwesome5 name="file" size={22} color="gray" />
            </View>
          ) : (
            <View className="flex flex-row justify-center mr-5">
              <Pressable onPress={() => setSaveModalVisible(true)}>
                <FontAwesome5 name="file" size={22} color="orange" />
              </Pressable>
            </View>
          )}
        </View>

        <View className="px-5 h-full">
          <View className="mb-6 mt-7">
            <Text className="text-extrabold text-lg text-gray">
              Product's Name
            </Text>
            <TextInput
              className="text-light border-b-[1.5px] border-zinc-500"
              onChangeText={setName}
              value={name}
              placeholder="Enter product name"
              placeholderTextColor="gray"
            />
          </View>
          <View className="mb-6">
            <Text className=" mt-3 text-extrabold text-lg text-gray">
              Price
            </Text>
            <TextInput
              className="text-light border-b-[1.5px] border-zinc-500"
              onChangeText={setPrice}
              value={price}
              placeholder="Enter product price"
              placeholderTextColor="gray"
              keyboardType="numeric"
            />
          </View>
          <View className="mb-6">
            <Text className=" mt-3 text-extrabold text-lg text-zinc-600">
              Product Information
            </Text>
            <TextInput
              className="text-light border-b-[1.5px] border-zinc-500"
              onChangeText={setInfo}
              value={info}
              placeholder="Enter product information"
              placeholderTextColor="gray"
            />
          </View>
          <View className="w-26">
            <Text className=" mt-3 text-bold text-lg text-gray mb-3">
              Product Photo
            </Text>
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
                <Text className="text-center text-light text-zinc-400 mt-1">
                  Add photos
                </Text>
              </Pressable>
            )}

            <CustomModal
              visible={modalVisible}
              message="Choose an option"
              optionOneText="Gallery"
              optionTwoText="Camera"
              optionOnePressed={openGallery}
              optionTwoPressed={openCamera}
              optionTwoColor="blue"
              closeModal={closeModal}
            />

            <CustomModal
              visible={saveModalVisible}
              message="Save item?"
              optionOneText="Yes"
              optionTwoText="No"
              optionOnePressed={() => saveProduct()}
              optionTwoPressed={() => setSaveModalVisible(false)}
              optionTwoColor="red"
              closeModal={closeSaveModal}
            />

            <PopUpModal
              visible={successModalVisible}
              // Todo [Optional]: Give proper transaction name
              message="Transaction Successful"
              text={'Okay'}
              link={'category'}
              id={categoryID}
              closeModal={() => setSuccessModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
