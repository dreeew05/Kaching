import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";

// INTERFACE

import { ImageButtonInterface } from "./interfaces/ImageButtonInterface";

const ImageButton : React.FC<ImageButtonInterface> = 
    ({onPress, text, image}) => {
        return(
            <TouchableOpacity onPress={onPress}>
                <View>
                    <Image 
                        source = {image}
                        style = {styles.image}
                    />
                    <Text>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }

const styles = StyleSheet.create({
    image : {
        width: 100,
        height: 100
    }
})

export default ImageButton;