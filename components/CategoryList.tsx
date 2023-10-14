import React from 'react';
import { ScrollView, View } from 'react-native';

// DATA
import categories from '../constants/Categories';

// COMPONENT
import CategoryCardClickable from './CategoryCardClickable';


const CategoryList : React.FC = () => {
    return(
        <ScrollView>
            <View className='flex flex-row flex-wrap my-5 mx-auto'>
                {categories.map((category) => (
                    <View className='w-1/2' key={category.id}>
                        <CategoryCardClickable
                            id    = {category.id}
                            name  = {category.name}
                            image = {category.image} 
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default CategoryList;
