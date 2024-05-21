import { AntDesign } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Skeleton } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsModifyProductLoading } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import {
  setIsModifyProductLoading,
  setProductModifiedActions,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';
import {
  insertData,
  selectData,
  updateData,
} from '../DatabaseUtils/CoreFunctions';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';
import { Text, View } from '../Themed';
import ParamsToInteger from '../__utils__/helper/ParamsToInteger';

type ModifyItemProps = {
  type: string;
};

export default function ModifyItem({ type }: ModifyItemProps) {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>();
  const [info, setInfo] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [insertModalVisible, setInsertModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const param = useLocalSearchParams();
  const productID = ParamsToInteger(param.id);
  const categoryID = ParamsToInteger(param.category_id);

  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsModifyProductLoading);

  useEffect(() => {
    if (type == 'add') {
      dispatch(setIsModifyProductLoading(false));
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

  const openCamera = () => {
    openImagePicker('camera');
    setImageModalVisible(false);
  };
  const openGallery = () => {
    openImagePicker('gallery');
    setImageModalVisible(false);
  };

  const isAnyInputEmpty = () => {
    return (
      name === '' || price === '' || info === '' || !selectedImage
    );
  };

  const openImagePicker = async (mode: string) => {
    // No permissions request is necessary for launching the image library
    // Todo: Put to another component [Duplicate]
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
    setSaveModalVisible(false);

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
        .then((_) => {
          dispatch(setProductModifiedActions('insert'));
          setInsertModalVisible(true);
        })
        .catch((error) => {
          // Todo: Add error message
          console.log(error);
        });
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
        .then((_) => {
          dispatch(setProductModifiedActions('update'));
          setUpdateModalVisible(true);
        })
        .catch((error) => {
          // Todo: Add error message
          console.log(error);
        });
    }
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
    <View className=" bg-white">
      <View className=" bg-white">
        <View
          className="mb-2 bg-white"
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            className=" bg-white"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {type === 'add' ? (
              <Text
                className="text-center text-xl w-4/5 text-green mt-3"
                style={{ fontFamily: 'Poppins-Bold', fontSize: 22 }}
              >
                Add Item
              </Text>
            ) : (
              <Text
                className="text-center text-xl w-4/5 text-green mt-3"
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 22,
                }}
              >
                Edit Item
              </Text>
            )}
            {isAnyInputEmpty() ? (
              <View
                className="mr-5 mt-3 bg-white"
                style={{ position: 'absolute', right: 0, top: 0 }}
              >
                <FontAwesome5 name="file" size={22} color="gray" />
              </View>
            ) : (
              <View
                className="mr-5 mt-3 bg-white"
                style={{ position: 'absolute', right: 0, top: 0 }}
              >
                <Pressable onPress={() => setSaveModalVisible(true)}>
                  <FontAwesome5
                    name="file"
                    size={22}
                    color="orange"
                  />
                </Pressable>
              </View>
            )}
          </View>
        </View>

        <View className="px-5 h-full bg-white">
          <View className="mb-6 mt-7 bg-white">
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
          <View className="mb-6 bg-white">
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
          <View className="mb-6 bg-white">
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
          <View className="w-26 bg-white">
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
                  onPress={() => setImageModalVisible(true)}
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
              visible={imageModalVisible}
              message="Choose an option"
              optionOneText="Camera"
              optionTwoText="Gallery"
              optionOnePressed={openCamera}
              optionTwoPressed={openGallery}
              optionOneColor="blue"
              optionTwoColor="blue"
              closeModal={() => setImageModalVisible(false)}
            />

            <CustomModal
              visible={saveModalVisible}
              message="Do you want to save the item?"
              optionOneText="Yes"
              optionTwoText="Cancel"
              optionOnePressed={() => saveProduct()}
              optionTwoPressed={() => setSaveModalVisible(false)}
              optionOneColor="blue"
              optionTwoColor="red"
              closeModal={() => setSaveModalVisible(false)}
            />

            <PopUpModal
              visible={insertModalVisible}
              message="Product added successfully"
              text={'Done'}
              link={'allProducts'}
              id={categoryID}
              color="green"
              closeModal={() => setInsertModalVisible(false)}
            />

            <PopUpModal
              visible={updateModalVisible}
              message="Item edited successfully"
              text={'Done'}
              link={'allProducts'}
              id={categoryID}
              color="green"
              closeModal={() => setUpdateModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
