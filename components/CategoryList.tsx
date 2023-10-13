import React from 'react';
import { ScrollView, View } from 'react-native';
import CategoryCard from './CategoryCard';

interface CategoryListProps {
  categories: { categoryName: string; categoryImage: string }[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex flex-row flex-wrap my-5 mx-auto">
                {categories.map((category, index) => (
                <View className="w-1/2" key={index}>
                <CategoryCard categoryName={category.categoryName} categoryImage={category.categoryImage} />
            </View>
            ))}
            </View>
        </ScrollView>
    );
};

export default CategoryList;
