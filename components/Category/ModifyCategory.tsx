import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, Text, ImageSourcePropType } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import CustomPressable from '../Common/CustomPressable';
import { insertData, selectData, updateData } from '../../components/DatabaseUtils/CoreFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAction, setIsModifyCategoryLoading } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';
import { Skeleton } from 'moti/skeleton';
import { StyleSheet } from 'react-native';
import { selectIsModifyCategoryLoading } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { MotiView } from 'moti';

export default function ModifyCategory() {
  const param = useLocalSearchParams();

  const [categoryName, setCategoryName] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>('');

  const dispatch = useDispatch();
  const router = useRouter();

  const db = getDatabase();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [popModalVisible, setPopModalVisible] = useState<boolean>(false);

  const isLoading = useSelector(selectIsModifyCategoryLoading);

  const currentID = useRef<number>(0);

  useEffect(() => {
    if(param.operation == 'editCategory') {
      const tableName    = 'category',
            column       = ['*'],
            targetAttrib = 'id';

      selectData(tableName, column, targetAttrib, param.id)
        .then((result) => {
          // Add timeout to have a smooth loading screen
          setTimeout(() => {
            dispatch(
              setIsModifyCategoryLoading(false)
            );
          }, 2000);
          setCategoryName(result[0].name);
          setSelectedImage(result[0].image); 
      });
    }
    else {
      dispatch(
        setIsModifyCategoryLoading(false)
      );
      setCategoryName('');
    }
  }, [param]);

  const show = () => {
    return(
      <MotiView
        transition={{
          type: 'timing',
        }}
        animate={{ backgroundColor: '#ffffff' }}
      >
        <Skeleton 
          show={isLoading}
          width={200}
          colorMode='dark'
        >
          <Image
            // className=" h-48 w-48"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
              width: 200
            }}
            // CHANGE ICON
            source={
              selectedImage 
                ? { uri: selectedImage } 
                : require('../../assets/icons/add-photo.png')
              }
          />
        </Skeleton>
      </MotiView>
    )
  }

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
    }
    else {
      saveCategory();
      router.push('//')
    }
  }

  const saveCategory = () => {
    const tableName = 'category';
    const data = [{
      name : categoryName,
      image : selectedImage
    }]

    if(param.operation == 'editCategory') {
      const targetAttrib  = 'name',
            targetAttrib2 = 'image', 
            targetValue   = data[0].name,
            targetValue2  = data[0].image,
            refAttrib     = 'id',
            refValue      = param.id;

      // UPDATE NAME
      updateData(tableName, targetAttrib, targetValue, refAttrib, 
        refValue)
        .then((result) => {
          // dispatch(
          //   addCategoryAction('update')
          // )
          // console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
      // UPDATE IMAGE
      updateData(tableName, targetAttrib2, targetValue2, refAttrib, 
        refValue)
        .then((result) => {
        })
        .catch((error) => {
          console.log(error)
        })
        dispatch(
          addCategoryAction('update')
        )
    }
    else {
      insertData(tableName, data)
      .then((result) => {
        dispatch(
          addCategoryAction('add')
        )
        // console.log(result)
      })
      .catch((error) => {
        console.log(error);
      });
    }
    setModalVisible(false);
  }

  const styles = StyleSheet.create({
    image : {
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      width: 60
    }
  })

  return (
    <View className="flex-1 justify-center items-center">
      {/* {isLoading && (
        <Text>Loading</Text>
      )} */}
      {/* <Skeleton.Group show={true}> */}
        {/* <View
          // className="h-60 w-60 justify-center items-center"
          style={styles.image}
        >
          <TouchableOpacity onPress={pickImage}>
            <Skeleton show={isLoading} colorMode='light'>
              <Image
                className=" h-48 w-48"
                // CHANGE ICON
                source={
                  selectedImage 
                    ? { uri: selectedImage } 
                    : require('../../assets/icons/add-photo.png')
                  }
              />
            </Skeleton>
          </TouchableOpacity>
        </View>
      <View className=' w-11/12'>
        <SafeAreaView>
          <TextInput
            className=" w-3/5 text-center self-center border-b-2 border-zinc-400 text-xl"
            onChangeText={setCategoryName}
            value={categoryName}
            // INCREASE WIDTH 
            placeholder=""
          />
        </SafeAreaView>
        <Text className="text-center text-gray mt-2 mb-52">
          Enter Category Name
        </Text>
        
        <CustomPressable
          text="Save"
          onPress={() => setModalVisible(true)}
          disabled={false}
        />

        <CustomModal
          visible={modalVisible}
          message='Do you want to save your changes?'
          optionOneText='Yes'
          optionTwoText='No'
          optionOnePressed={() => checkIfValid()}
          optionTwoPressed={() => setModalVisible(false)}
          optionTwoColor='red'
          closeModal={() => setModalVisible(false)}
        />

        <PopUpModal
          visible={popModalVisible}
          message='Please fill out all fields'
          agreeText='Okay'
          closeModal={() => setPopModalVisible(false)}
        />

      </View> */}
      {show()}
    </View>
  );
}
