import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

//  COMPONENT
import CategoryCard from './CategoryCard';
import { CategoryProps } from '../__utils__/interfaces/CategoryProps';
import { useDispatch } from 'react-redux';
import { addProductAction } from '../../redux/GlobalStateRedux/GlobalStateSlice';

export default function CategoryCardClickable({ id, name, image }: CategoryProps) {

  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(
      addProductAction('select')
    );
  }
  
  return (
    <Link
      href={{
        pathname: '/(tabs)/categoryView',
        params: { id: id },
      }}
      asChild
    >
      <TouchableOpacity onPress={clickHandler}
        className="bg-white dark:bg-black 
                shadow-md rounded-md m-2 p-2"
      >
        <CategoryCard id={id} name={name} image={image} />
      </TouchableOpacity>
    </Link>
  );
}
