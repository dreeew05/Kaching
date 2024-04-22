import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

//  COMPONENT
import { useDispatch } from 'react-redux';
import { setIsCategoryViewProductLoading } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { CategoryProps } from '../__utils__/interfaces/CategoryProps';
import CategoryCard from './CategoryCard';

export default function CategoryCardClickable({
  id,
  name,
  image,
}: CategoryProps) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setIsCategoryViewProductLoading(true));
  };

  return (
    <Link
      href={{
        pathname: '/(tabs)/categoryView',
        params: { id: id },
      }}
      asChild
    >
      <TouchableOpacity
        onPress={clickHandler}
        className="bg-white dark:bg-black
                shadow-md rounded-md m-2 p-2"
      >
        <CategoryCard id={id} name={name} image={image} />
      </TouchableOpacity>
    </Link>
  );
}
