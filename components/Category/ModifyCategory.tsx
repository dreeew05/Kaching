import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, ImageSourcePropType } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import CustomPressable from '../../components/CustomPressable';
import { insertData } from '../../components/DatabaseUtils/CoreFunctions';
import { useDispatch } from 'react-redux';
import { addCategoryAction } from '../../redux/GlobalStateRedux/GlobalStateSlice';

export default function ModifyCategory() {
  const param = useLocalSearchParams();

  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState<ImageSourcePropType | null>(null);
  const [imageUri, setImageUri] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (param.operation == 'editCategory') {
      const id = ParamsToInteger(param.id);

      const getData = (id: number) => {
        // HARD-CODED TEST DATA [MUST CHANGE]
        return {
          name: 'Test Name ' + id,
          image: require('../../assets/icons/blank.jpg'),
        };
      };

      setCategoryName(getData(id).name);
      setImage(getData(id).image);
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
      setImage(pickedImage);
      setImageUri(pickedImage.uri || '');
    }
  };

  const saveCategory = () => {
    const tableName = 'category';
    const data = [{
      name : categoryName,
      image : imageUri
    }]
    dispatch(
      addCategoryAction('add')
    )
    insertData(tableName, data)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className="h-60 w-60 justify-center items-center">
        {image && (
          <Image
            source={image}
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
