import React, { useEffect, useState } from 'react';
import { Text, View } from '../Themed';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsCategoryViewProductLoading,
  setIsModifyProductLoading,
  setProductModifiedActions,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';
import ParamsToInteger from '../__utils__/helper/ParamsToInteger';
import { PopUpModal } from '../Modals/PopUpModal';
import { selectIsModifyProductLoading } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { Skeleton } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient';

type ModifyItemProps = {
  type: string;
};

export default function ModifyItem({ type }: ModifyItemProps) {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>();
  const [info, setInfo] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] =
    useState(false);

  const param = useLocalSearchParams();
  const productID = ParamsToInteger(param.id);
  const categoryID = ParamsToInteger(param.category_id);

  const router = useRouter();
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsModifyProductLoading);

  useEffect(() => {
    if (type == 'add') {
      clearData();
    } else {
      const tableName = 'item';
      const column = ['*'];
      const targetAttrib = 'id';

      selectData(tableName, column, targetAttrib, productID).then(
        (result) => {
          setName(result[0].name);
          setPrice(result[0].price.toString());
          setInfo(result[0].description);
          setSelectedImage(result[0].image);
          setTimeout(() => {
            dispatch(setIsModifyProductLoading(false));
          }, 100);
        },
      );
    }
  }, [param]);

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
          category_id: categoryID,
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
      const refValue = productID;

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
    dispatch(setIsCategoryViewProductLoading(true));
    clearData();
  };

  const styles = StyleSheet.create({
    skeletonTextTitle: {
      width: 180,
      height: 30,
    },
    skeletonTextInput: {
      width: 370,
      height: 30,
    },
    textTitle: {
      fontFamily: 'Poppins-Bold',
      fontSize: 18,
      color: 'gray',
      height: 30,
    },
    textInput: {
      borderBottomWidth: 1.5,
      borderBottomColor: 'gray',
      color: 'black',
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      height: 30,
    },
    image: {
      height: 120,
      width: 120,
      borderRadius: 20,
      marginTop: 5,
    },
  });

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
                id: categoryID,
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
            {isLoading ? (
              <>
                <Skeleton
                  animation="wave"
                  width={styles.skeletonTextTitle.width}
                  height={styles.skeletonTextInput.height}
                  LinearGradientComponent={LinearGradient}
                />
                <View style={{ marginBottom: 6 }}></View>
                <Skeleton
                  animation="wave"
                  width={styles.skeletonTextInput.width}
                  height={styles.skeletonTextInput.height}
                  LinearGradientComponent={LinearGradient}
                />
              </>
            ) : (
              <>
                <Text style={styles.textTitle}>Product's Name</Text>
                <View style={{ marginBottom: 5 }}></View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setName}
                  value={name}
                  placeholder="Enter product name"
                  placeholderTextColor="gray"
                />
              </>
            )}
          </View>
          <View className="mb-6">
            {isLoading ? (
              <>
                <Skeleton
                  animation="wave"
                  width={styles.skeletonTextTitle.width}
                  height={styles.skeletonTextInput.height}
                  LinearGradientComponent={LinearGradient}
                />
                <View style={{ marginBottom: 5 }}></View>
                <Skeleton
                  animation="wave"
                  width={styles.skeletonTextInput.width}
                  height={styles.skeletonTextInput.height}
                  LinearGradientComponent={LinearGradient}
                />
              </>
            ) : (
              <>
                <Text style={styles.textTitle}>Price</Text>
                <View style={{ marginBottom: 5 }}></View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setPrice}
                  value={price}
                  placeholder="Enter product price"
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                />
              </>
            )}
          </View>
          <View className="mb-6">
            {isLoading ? (
              <>
                <Skeleton
                  animation="wave"
                  width={styles.skeletonTextTitle.width}
                  height={styles.skeletonTextInput.height}
                  LinearGradientComponent={LinearGradient}
                />
                <View style={{ marginBottom: 5 }}></View>
                <Skeleton
                  animation="wave"
                  width={styles.skeletonTextInput.width}
                  height={styles.skeletonTextInput.height}
                  LinearGradientComponent={LinearGradient}
                />
              </>
            ) : (
              <>
                <Text style={styles.textTitle}>
                  Product Information
                </Text>
                <View style={{ marginBottom: 5 }}></View>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setInfo}
                  value={info}
                  placeholder="Enter product information"
                  placeholderTextColor="gray"
                />
              </>
            )}
          </View>
          <View className="w-26">
            {isLoading ? (
              <>
                <Skeleton
                  animation="wave"
                  width={styles.skeletonTextTitle.width}
                  height={styles.skeletonTextInput.height}
                  LinearGradientComponent={LinearGradient}
                />
                <View style={{ marginBottom: 5 }}></View>
                <Skeleton
                  animation="wave"
                  width={styles.image.width}
                  height={styles.image.height}
                  LinearGradientComponent={LinearGradient}
                />
              </>
            ) : (
              <>
                <Text style={styles.textTitle}>Product Photo</Text>
                <Pressable
                  onPress={() => setModalVisible(true)}
                  style={styles.image}
                  className="bg-zinc-200 justify-center items-center shadow-lg shadow-neutral-600"
                >
                  {selectedImage ? (
                    <Image
                      style={styles.image}
                      source={{ uri: selectedImage }}
                      resizeMode="contain"
                    />
                  ) : (
                    <>
                      <AntDesign
                        name="pluscircle"
                        // style={styles.image}
                        size={24}
                        color="gray"
                      />
                      <Text className="text-center text-light text-zinc-400 mt-1">
                        Add photos
                      </Text>
                    </>
                  )}
                </Pressable>
              </>
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
              optionTwoPressed={closeSaveModal}
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
              closeModal={closeSuccessModal}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
