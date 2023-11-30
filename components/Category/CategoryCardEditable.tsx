import React from 'react';
import { Pressable, View, Text, Alert, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'expo-router';

// INTERFACE
import { CategoryProps } from '../__utils__/interfaces/CategoryProps';

// COMPONENT
import CategoryCard from './CategoryCard';

export default function CategoryCardEditable({ id, name, image }: CategoryProps) {
  const deleteAlert = (id: number) => {
    Alert.alert('Delete Category?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => console.log('Deleted Category with id: ' + id),
      },
    ]);
  };

  return (
    <View
      className="bg-white dark:bg-black 
            shadow-md rounded-md m-2 p-2"
    >
      <CategoryCard id={id} name={name} image={image} />

      <Link
        href={{
          pathname: '/(tabs)/modifyCategory',
          params: {
            operation: 'editCategory',
            id: id,
          },
        }}
        asChild
      >
        <TouchableOpacity
          className="h-7 rounded-md bg-green 
                    justify-center items-center"
        >
          <Text className="text-white">Edit</Text>
        </TouchableOpacity>
      </Link>

      <Pressable
        className="h-8 p-1.5 absolute top-2 right-2
                bg-red-500 rounded-md"
        onPress={() => deleteAlert(id)}
      >
        <FontAwesomeIcon icon={faTrash} style={{ color: '#ffffff' }} />
      </Pressable>
    </View>
  );
}
