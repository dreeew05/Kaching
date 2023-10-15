import React from 'react';
import { ScrollView, View } from 'react-native';

// CONSTANT DATA
import constantCategories from '../constants/Categories';

// COMPONENT
import CategoryCard from './CategoryCard';
import CategoryCardClickable from './CategoryCardClickable';
import CategoryCardEditable from './CategoryCardEditable';

// INTERFACE
import { CategoryProps } from './interfaces/CategoryProps';

interface CategoryListProps {
    cardType : string,
    categories : CategoryProps[]
}

const CategoryList : React.FC<CategoryListProps> = ({ cardType, categories }) => {
    return(
        <ScrollView>
            <View className='flex flex-row flex-wrap my-5 mx-auto'>
            
                {categories.map((category) => {
                    category.image = constantCategories[category.id]
                    switch(cardType) {
                        case 'regular':
                            return(regular(category));
                        case 'clickable':
                            return(clickable(category));
                        case 'editable':
                            return(editable(category));
                        default:
                            break;
                    }
                })}

            </View>
        </ScrollView>
    )
}

function regular(category : CategoryProps) {
    return(
        <View className='w-1/2' key={category.id}>
            <CategoryCard
                id={category.id}
                name={category.name}
                image={category.image}
            />
        </View>
    )
}

function clickable(category : CategoryProps) {
    return(
        <View className='w-1/2' key={category.id}>
            <CategoryCardClickable
                id={category.id}
                name={category.name}
                image={category.image}
            />
        </View>
    )
}

function editable(category : CategoryProps) {
    return(
        <View className='w-1/2' key={category.id}>
            <CategoryCardEditable
                id={category.id}
                name={category.name}
                image={category.image}
            />
        </View>
    )
}

export default CategoryList;
