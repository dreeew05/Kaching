import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter, Link } from 'expo-router';

//  COMPONENT
import CategoryCard from './CategoryCard';
import { CategoryProps } from '../__utils__/interfaces/CategoryProps';

export default function CategoryCardClickable({ id, name, image }: CategoryProps) {
  return (
    <Link
      href={{
        pathname: '/(tabs)/categoryView',
        params: { id: id },
      }}
      asChild
    >
      <TouchableOpacity
        className="bg-white dark:bg-black 
                shadow-md rounded-md m-2 p-2"
      >
        <CategoryCard id={id} name={name} image={image} />
      </TouchableOpacity>
    </Link>
  );
}
