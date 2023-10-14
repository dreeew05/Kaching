import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function addCategory() {
    const [text, onChangeText] = React.useState('');
    return(
        <View className="flex-1 justify-center items-center">
            <View className="h-60 w-60 items-center">
                <TouchableOpacity>
                    <Image className="h-40 w-40"
                        // CHANGE ICON 
                        source={require('../../assets/icons/circle-plus.png')}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <SafeAreaView>
                    <TextInput
                        className="text-center"
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Enter Category Name"
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}