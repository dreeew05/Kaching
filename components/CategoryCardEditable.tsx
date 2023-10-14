import React from "react";
import { Pressable, View, Text, Alert, Image } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// INTERFACE
import { CategoryProps } from "./interfaces/CategoryProps";

// COMPONENT
import CategoryCard from "./CategoryCard";

export default function CategoryCardEditable(
    { id, name, image } : CategoryProps ) {

    const editAction = () => {
        Alert.alert('Edit ' + id);
    }

    const deleteAlert = (id : number) => {
        Alert.alert('Delete Category?', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel'),
                style: 'cancel'
            }, 
            {
                text: 'Yes',
                onPress: () => console.log('Deleted Category with id: ' + id)
            }
        ]);
    }
    
    return(
        <View className="bg-white dark:bg-black 
            shadow-md rounded-md m-2 p-2">
        
            <CategoryCard
                id    = {id}
                name  = {name}
                image = {image}
            />

            <Pressable className="h-7 rounded-md bg-green 
                justify-center items-center"
                onPress={editAction}>

                <Text className="text-white">Edit</Text>

            </Pressable>

            <Pressable className="h-8 p-1.5 absolute top-2 right-2
                bg-red-500 rounded-md"
                onPress={() => deleteAlert(id)}>

            <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",}} />

            </Pressable>

        </View>
    )

}   