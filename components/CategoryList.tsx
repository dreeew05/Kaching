import React from 'react';
import { ScrollView, View } from 'react-native';

// CONSTANT DATA
import categories from '../constants/Categories';

// COMPONENT
import CategoryCardClickable from './CategoryCardClickable';
import CategoryCard from './CategoryCard';

// INTERFACE
import { CategoryProps } from './interfaces/CategoryProps';

interface CategoryListProps {
    cardType : string,
    categoryIDs : number[]
}

const CategoryList : React.FC<CategoryListProps> = ({ cardType, categoryIDs }) => {
    return(
        <ScrollView>
            <View className='flex flex-row flex-wrap my-5 mx-auto'>
                
                {categories.map((category) => {
                    if(categoryIDs.includes(category.id)) {
                        switch(cardType) {
                            case 'regular':
                                return(regular(category));
                            case 'clickable':
                                return(clickable(category));
                            default:
                                break;
                        }
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

export default CategoryList;
