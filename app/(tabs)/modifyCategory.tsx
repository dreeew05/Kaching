import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text, ImageSourcePropType } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from "expo-router";
import ParamsToInteger from "../../components/__utils__/helper/ParamsToInteger";

export default function modifyCategory() {

    const param = useLocalSearchParams();

    let defaultName = '',
        defaultImage = null;

    if(param.operation == "editCategory") {

        const id = ParamsToInteger(param.id)

        console.log(id)

        const getData = (id : number) => {
            // HARD-CODED TEST DATA [MUST CHANGE]
            return {
                name : 'Test Name',
                image : require('../../assets/icons/blank.jpg')
            }
        }

        defaultName  = getData(id).name;
        defaultImage = getData(id).image;
    }   

    const [categoryName, setCategoryName] = useState(defaultName);
    const [image, setImage] = useState(defaultImage);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

    //     console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return(
        <View className="flex-1 justify-center items-center">
            <View className="h-60 w-60 justify-center items-center">
                {image && 
                    <Image 
                        source={image} 
                        style={{ width: 200, height: 200 }}
                        className="absolute top-1.8
                            rounded-md" 
                    />
                }
                <TouchableOpacity onPress={pickImage}>
                    <Image className="h-40 w-40"
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
                <Text className="text-center mt-3 text-gray-500">
                    Enter Category Name
                </Text>
            </View>
        </View>
    )
}