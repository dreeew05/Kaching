import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Skeleton } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  insertData,
  selectData,
  updateData,
} from '../../components/DatabaseUtils/CoreFunctions';
import { selectIsModifyCategoryLoading } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import {
  setCategoryModifedActions,
  setIsModifyCategoryLoading,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';

export default function ModifyCategory() {
  const param = useLocalSearchParams();

  const [categoryName, setCategoryName] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    null,
  );
  const [mediaModalVisible, setMediaModalVisible] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  const [saveModalVisible, setSaveModalVisible] =
    useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] =
    useState<boolean>(false);
  const [insertModalVisible, setInsertModalVisible] =
    useState<boolean>(false);

  const isLoading = useSelector(selectIsModifyCategoryLoading);

  useEffect(() => {
    if (param.operation == 'editCategory') {
      const tableName = 'category',
        column = ['*'],
        targetAttrib = 'id';

      selectData(tableName, column, targetAttrib, param.id).then(
        (result) => {
          // Add timeout to have a smooth loading screen
          setTimeout(() => {
            dispatch(setIsModifyCategoryLoading(false));
          }, 200);
          setCategoryName(result[0].name);
          setSelectedImage(result[0].image);
        },
      );
    } else {
      dispatch(setIsModifyCategoryLoading(false));
      setSelectedImage(null);
      setCategoryName('');
    }
  }, [param]);

  const styles = StyleSheet.create({
    image: {
      height: 200,
      width: 200,
    },
  });

  const showImageComponent = () => {
    return (
      <View className="h-60 w-60 justify-center items-center">
        {isLoading ? loadingImageComponent() : loadedImageComponent()}
      </View>
    );
  };

  const loadingImageComponent = () => {
    return (
      <>
        <Skeleton
          animation="wave"
          width={styles.image.width}
          height={styles.image.height}
          LinearGradientComponent={LinearGradient}
        />
      </>
    );
  };

  const loadedImageComponent = () => {
    return (
      <TouchableOpacity onPress={() => setMediaModalVisible(true)}>
        <Image
          style={styles.image}
          source={
            selectedImage
              ? { uri: selectedImage }
              : require('../../assets/icons/add-photo.png')
          }
        />
      </TouchableOpacity>
    );
  };

  const showTextComponent = () => {
    return (
      <View className="w-11/12">
        {isLoading ? loadingTextComponent() : loadedTextComponent()}
      </View>
    );
  };

  const loadingTextComponent = () => {
    return (
      <>
        <SafeAreaView className="mt-2">
          <View className="w-3/5"></View>
        </SafeAreaView>
        <View className="mt-2">
          <ActivityIndicator size="large" color="green" />
        </View>
      </>
    );
  };

  const loadedTextComponent = () => {
    return (
      <>
        <SafeAreaView className="mt-2">
          <TextInput
            className="w-1/2 text-green font-medium text-center self-center border-b-gray border-b-2 text-xl"
            placeholder="Category Name"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
        </SafeAreaView>
        <Text className="text-center text-gray mt-2">
          Enter Category Name
        </Text>
      </>
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

  const openCamera = () => {
    openImagePicker('camera');
    setMediaModalVisible(false);
  };
  const openGallery = () => {
    openImagePicker('gallery');
    setMediaModalVisible(false);
  };

  const areFieldsValid = () => {
    return categoryName == '' || selectedImage == null;
  };

  const saveCategory = () => {
    const tableName = 'category';
    const data = [
      {
        name: categoryName,
        image: selectedImage,
      },
    ];

    setSaveModalVisible(false);

    if (param.operation == 'editCategory') {
      const targetAttrib = ['name', 'image'];
      const targetValue = [data[0].name, data[0].image];
      const refAttrib = 'id';
      const refValue = param.id;

      updateData(
        tableName,
        targetAttrib,
        targetValue,
        refAttrib,
        refValue,
      )
        .then((_) => {
          dispatch(setCategoryModifedActions('update'));
          setUpdateModalVisible(true);
        })
        .catch((error) => {
          // Todo: Add error message
          console.log(error);
        });
    } else {
      insertData(tableName, data)
        .then((_) => {
          dispatch(setCategoryModifedActions('insert'));
          setInsertModalVisible(true);
        })
        .catch((error) => {
          // Todo: Add error message
          console.log(error);
        });
    }

    clearFields();
  };

  const clearFields = () => {
    setSelectedImage(null);
    setCategoryName('');
  };

  return (
    <>
      {/* Header [START] */}
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
              pathname: '/(tabs)/modifyCategoryView',
            }}
            asChild
          >
            <Pressable className="ml-3" onPress={clearFields}>
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
            {param.operation === 'editCategory' ? (
              <Text
                className="text-center text-xl w-4/5 text-green"
                style={{ fontFamily: 'Poppins-Bold' }}
              >
                Edit Category
              </Text>
            ) : (
              <Text
                className="text-center text-xl w-4/5 text-green"
                style={{ fontFamily: 'Poppins-Bold' }}
              >
                Add Category
              </Text>
            )}
          </View>

          {areFieldsValid() ? (
            <View className="mr-5">
              <FontAwesome5 name="file" size={22} color="gray" />
            </View>
          ) : (
            <Pressable
              className="mr-5"
              onPress={() => setSaveModalVisible(true)}
            >
              <FontAwesome5 name="file" size={22} color="orange" />
            </Pressable>
          )}
        </View>
      </View>
      {/* Header [END] */}

      <View className="flex-1 justify-center items-center">
        {showImageComponent()}
        {showTextComponent()}

        <CustomModal
          visible={saveModalVisible}
          message="Do you want to save your changes?"
          optionOneText="Yes"
          optionTwoText="No"
          optionOnePressed={() => saveCategory()}
          optionTwoPressed={() => setSaveModalVisible(false)}
          optionOneColor="blue"
          optionTwoColor="red"
          closeModal={() => setSaveModalVisible(false)}
        />

        <PopUpModal
          visible={updateModalVisible}
          message="Item edited successfully."
          text="Done"
          id={0}
          link={'goBack'}
          color="green"
          closeModal={() => setUpdateModalVisible(false)}
        />

        <PopUpModal
          visible={insertModalVisible}
          message="Category inserted successfully."
          text="Done"
          id={0}
          link={'goBack'}
          color="green"
          closeModal={() => setInsertModalVisible(false)}
        />

        <CustomModal
          visible={mediaModalVisible}
          message="Select an option"
          optionOneText="Camera"
          optionTwoText="Gallery"
          optionOnePressed={openCamera}
          optionTwoPressed={openGallery}
          closeModal={() => setMediaModalVisible(false)}
          optionOneColor=""
          optionTwoColor={''}
        />
      </View>
    </>
  );
}
