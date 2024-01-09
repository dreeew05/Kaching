import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, ImageSourcePropType } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import CustomPressable from '../Common/CustomPressable';
import { insertData, selectData, updateData } from '../../components/DatabaseUtils/CoreFunctions';
import { useDispatch } from 'react-redux';
import { addCategoryAction } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';

export default function ModifyCategory() {
  const param = useLocalSearchParams();

  const [categoryName, setCategoryName] = useState<string>('');
  const [image, setImage] = useState<string | null>('');
  const [selectedImage, setSelectedImage] = useState<string | null>('');

  const dispatch = useDispatch();
  const router = useRouter();

  const db = getDatabase();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [popModalVisible, setPopModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (param.operation == 'editCategory') {
      const id = ParamsToInteger(param.id);
      
      const tableName    = 'category',
            column       = ['*'],
            targetAttrib = 'id';

      selectData(tableName, column, targetAttrib, id)
        .then((result) => {
          // console.log(result[0].name)
          setCategoryName(result[0].name)
          setImage(result[0].image)
          setSelectedImage(result[0].image); 
        })

    } else {
      setCategoryName('');
      setImage(null);
      setSelectedImage(null);
    }
  }, [param]);

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
      setImage(pickedImage.uri || '');
      setSelectedImage(pickedImage.uri || ''); // Update selectedImage when an image is picked
    }
  };

  const checkIfValid = () => {
    if (categoryName == '' || image == '') {
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
      image : image
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

  return (
    <View className="flex-1 justify-center items-center">
      <View className="h-60 w-60 justify-center items-center">
        {image && (
          <Image
            source={{uri : image}}
            style={{ width: 200, height: 200 }}
            className="absolute top-1.8
                            rounded-md"
          />
        )}
        <TouchableOpacity onPress={pickImage}>
          <Image
            className=" h-48 w-48"
            // CHANGE ICON
            source={selectedImage ? { uri: selectedImage } : require('../../assets/icons/add-photo.png')}
          />
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
        <Text className="text-center text-gray mt-2 mb-52">Enter Category Name</Text>
        
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

      </View>
    </View>
  );
}
