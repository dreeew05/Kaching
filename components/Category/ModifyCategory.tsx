import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, ImageSourcePropType } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import CustomPressable from '../../components/CustomPressable';
import { insertData, selectData, updateData } from '../../components/DatabaseUtils/CoreFunctions';
import { useDispatch } from 'react-redux';
import { addCategoryAction } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';

export default function ModifyCategory() {
  const param = useLocalSearchParams();

  const [categoryName, setCategoryName] = useState<string>('');
  const [image, setImage] = useState<string | null>('');

  const dispatch = useDispatch();

  const db = getDatabase();

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
        })

    } else {
      setCategoryName('');
      setImage(null);
    }
  }, [param]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const pickedImage: ImageSourcePropType = {
        uri: result.assets[0].uri,
      };
      setImage(pickedImage.uri || '');
    }
  };

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
          dispatch(
            addCategoryAction('update')
          )
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
      // UPDATE IMAGE
      updateData(tableName, targetAttrib2, targetValue2, refAttrib, 
        refValue)
        .then((result) => {
          dispatch(
            addCategoryAction('update')
          )
          console.log(result)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    else {
      insertData(tableName, data)
      .then((result) => {
        dispatch(
          addCategoryAction('add')
        )
        console.log(result)
      })
      .catch((error) => {
        console.log(error);
      });
    }
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
            className="h-40 w-40"
            // CHANGE ICON
            source={require('../../assets/icons/circle-plus.png')}
          />
        </TouchableOpacity>
      </View>
      <View>
        <SafeAreaView>
          <TextInput
            className="w-100 text-center border-b-2 border-gray-500"
            onChangeText={setCategoryName}
            value={categoryName}
            // MAY SPACE ANG PLACEHOLDER HEHE [DI KO BALAN PANO MAINCREASE ANG WIDTH]
            placeholder="                                               
                            "
          />
        </SafeAreaView>
        <Text className="text-center mt-3 text-gray-500">Enter Category Name</Text>
        
        <CustomPressable
          text="Save"
          onPress={saveCategory}
          disabled={false}
        />

      </View>
    </View>
  );
}
