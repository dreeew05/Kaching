import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setIsModifyCategoryLoading } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { deleteData } from '../DatabaseUtils/CoreFunctions';
import CustomModal from '../Modals/CustomModal';
import { PopUpModal } from '../Modals/PopUpModal';
import { CategoryProps } from '../__utils__/interfaces/CategoryProps';
import CategoryCard from './CategoryCard';

export default function CategoryCardEditable({
  id,
  name,
  image,
}: CategoryProps) {
  const dispatch = useDispatch();
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // Todo: Not used yet
  const [deleteModalErrorVisible, setDeleteModalErrorVisible] =
    useState(false);

  const deleteCategory = (id: number) => {
    const tableName: string = 'category';
    const refAttribute: string = 'id';

    setIsDeleteModalVisible(false);

    deleteData(tableName, refAttribute, id)
      .then((_) => {
        setDeleteModalVisible(true);
      })
      .catch((error) => {
        // Todo: Add error message
        console.log('Deletion Failed', error);
      });
  };

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
        onPress={() => setIsDeleteModalVisible(true)}
      >
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: '#ffffff' }}
        />
      </Pressable>

      <CustomModal
        visible={isDeleteModalVisible}
        message="Are you sure you want to delete this category?"
        optionOneText="Yes"
        optionTwoText="Cancel"
        optionOnePressed={() => deleteCategory(id)}
        optionTwoPressed={() => setIsDeleteModalVisible(false)}
        optionOneColor="blue"
        optionTwoColor="red"
        closeModal={() => setIsDeleteModalVisible(false)}
      />

      <PopUpModal
        visible={deleteModalVisible}
        message="Category deleted successfully"
        text={'Done'}
        link={'dispatchCategory'}
        id={0}
        color="green"
        closeModal={() => setDeleteModalVisible(false)}
      />

      <PopUpModal
        visible={deleteModalErrorVisible}
        message="Category deletion failed"
        text={'Dismiss'}
        link={null}
        id={0}
        color="red"
        closeModal={() => setDeleteModalErrorVisible(false)}
      />
    </View>
  );
}
