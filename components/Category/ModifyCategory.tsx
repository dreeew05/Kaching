import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import {
  insertData,
  selectData,
  updateData,
} from '../../components/DatabaseUtils/CoreFunctions';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryModifedActions,
  setIsModifyCategoryLoading,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';
import { Skeleton } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { selectIsModifyCategoryLoading } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function ModifyCategory() {
  const param = useLocalSearchParams();

  const [categoryName, setCategoryName] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    null,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const db = getDatabase();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [popModalVisible, setPopModalVisible] =
    useState<boolean>(false);

  const isLoading = useSelector(selectIsModifyCategoryLoading);

  const currentID = useRef<number>(0);

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
      <View
        // TODO: Give proper styling [Brute Force]
        style={{
          marginBottom: 85,
        }}
      >
        <Skeleton
          animation="wave"
          width={styles.image.width}
          height={styles.image.height}
          LinearGradientComponent={LinearGradient}
        />
      </View>
    );
  };

  const loadedImageComponent = () => {
    return (
      <TouchableOpacity onPress={pickImage}>
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
      // <>
      //   <Skeleton
      //     animation="wave"
      //     width={375}
      //     height={100}
      //     LinearGradientComponent={LinearGradient}
      //   />
      // </>
      <ActivityIndicator size="large" color="green" />
    );
  };

  const loadedTextComponent = () => {
    return (
      <>
        <SafeAreaView className="mt-2">
          <TextInput
            className="w-3/5 text-center self-center border-b-2 
              border-zinc-400 text-xl"
            placeholder="Category Name"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
        </SafeAreaView>
        <Text className="text-center text-gray mt-2">
          Enter Category Name
        </Text>
        {/* <CustomPressable
            text="Save"
            onPress={() => setModalVisible(true)}
            disabled={false}
          /> */}
      </>
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const pickedImage: ImageSourcePropType = {
        uri: result.assets[0].uri,
      };
      // Update selectedImage when an image is picked
      setSelectedImage(pickedImage.uri || '');
    }
  };

  const checkIfValid = () => {
    if (categoryName == '' || selectedImage == '') {
      setModalVisible(false);
      // console.log('Error')
      setPopModalVisible(true);
    } else {
      saveCategory();
      router.push('//');
    }
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

    if (param.operation == 'editCategory') {
      const targetAttrib = 'name',
        targetAttrib2 = 'image',
        targetValue = data[0].name,
        targetValue2 = data[0].image,
        refAttrib = 'id',
        refValue = param.id;

      // UPDATE NAME
      updateData(
        tableName,
        targetAttrib,
        targetValue,
        refAttrib,
        refValue,
      )
        .then((result) => {
          // Todo: Add success message
        })
        .catch((error) => {
          // Todo: Add error message
          console.log(error);
        });
      // UPDATE IMAGE
      updateData(
        tableName,
        targetAttrib2,
        targetValue2,
        refAttrib,
        refValue,
      )
        .then((result) => {
          dispatch(setCategoryModifedActions('update'));
          // Todo: Add success message
        })
        .catch((error) => {
          // Todo: Add error message
          console.log(error);
        });
    } else {
      insertData(tableName, data)
        .then((result) => {
          console.log('inserted');
          dispatch(setCategoryModifedActions('insert'));
          // Todo: Add success message
        })
        .catch((error) => {
          // Todo: Add error message
          console.log(error);
        });
    }
    setModalVisible(false);
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
              onPress={() => setModalVisible(true)}
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
          visible={modalVisible}
          message="Do you want to save your changes?"
          optionOneText="Yes"
          optionTwoText="No"
          optionOnePressed={() => checkIfValid()}
          optionTwoPressed={() => setModalVisible(false)}
          optionTwoColor="red"
          closeModal={() => setModalVisible(false)}
        />

        <PopUpModal
          visible={popModalVisible}
          message="Please fill out all fields"
          agreeText="Okay"
          closeModal={() => setPopModalVisible(false)}
        />
      </View>
    </>
  );
}
