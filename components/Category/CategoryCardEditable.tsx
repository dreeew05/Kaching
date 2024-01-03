import React from 'react';
import { Pressable, View, Text, Alert, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'expo-router';
import { CategoryProps } from '../__utils__/interfaces/CategoryProps';
import CategoryCard from './CategoryCard';
import { deleteData } from '../DatabaseUtils/CoreFunctions';
import { useDispatch } from 'react-redux';
import { addCategoryAction } from '../../redux/GlobalStateRedux/GlobalStateSlice';

export default function CategoryCardEditable({ id, name, image }: CategoryProps) {
  
  const dispatch = useDispatch();

  const deleteAlert = (id: number) => {
    Alert.alert('Delete Category?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => deleteCategory(id),
      },
    ]);
  };

  const deleteCategory = (id : number) => {
    const tableName : string = 'category';
    const refAttribute : string = 'id';

    deleteData(tableName, refAttribute, id)
      .then((result) => {
        dispatch(
          addCategoryAction('delete')
        )
        console.log(result)
      })
      .catch((error) => {
        console.log("Deletion Failed", error)
      })
  }

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
