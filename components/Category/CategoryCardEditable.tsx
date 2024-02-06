import React, { useRef, useState } from 'react';
import {
  Pressable,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'expo-router';
import { CategoryProps } from '../__utils__/interfaces/CategoryProps';
import CategoryCard from './CategoryCard';
import { deleteData } from '../DatabaseUtils/CoreFunctions';
import { useDispatch } from 'react-redux';
import {
  setCategoryModifedActions,
  setIsModifyCategoryLoading,
} from '../../redux/GlobalStateRedux/GlobalStateSlice';

export default function CategoryCardEditable({
  id,
  name,
  image,
}: CategoryProps) {
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

  const deleteCategory = (id: number) => {
    const tableName: string = 'category';
    const refAttribute: string = 'id';

    deleteData(tableName, refAttribute, id)
      .then((result) => {
        dispatch(setCategoryModifedActions('delete'));
        // Todo: Add success message
      })
      .catch((error) => {
        // Todo: Add error message
        console.log('Deletion Failed', error);
      });
  };

  const productID = useRef<number>(0);

  const setLoadingScreen = () => {
    dispatch(setIsModifyCategoryLoading(true));
  };

  return (
    <View
      className="bg-white dark:bg-black 
            shadow-md rounded-md m-2 p-2"
    >
      <CategoryCard id={id} name={name} image={image} />

      <Link
        href={{
          pathname: '/(tabs)/modifyCategoryWrapper',
          params: {
            operation: 'editCategory',
            id: id,
          },
        }}
        asChild
      >
        <TouchableOpacity
          onPress={() => setLoadingScreen()}
          className="h-10 rounded-md bg-green 
                    justify-center items-center"
        >
          <Text
            className="text-white text-lg self-center mt-1"
            style={{ fontFamily: 'Poppins-Medium' }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </Link>

      <Pressable
        className="h-8 p-1.5 absolute top-2 right-2
                bg-red-500 rounded-md"
        onPress={() => deleteAlert(id)}
      >
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: '#ffffff' }}
        />
      </Pressable>
    </View>
  );
}
