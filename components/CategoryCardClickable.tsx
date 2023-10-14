import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

//  COMPONENT
import CategoryCard from './CategoryCard';
import { CategoryProps } from './interfaces/CategoryProps';

export default function CategoryCardClickable({
    id, name, image
} : CategoryProps) {

    const router = useRouter();
    const handleCardClick = () => {
        // Navigate to Category View
        router.push('/categoryView');
    }

    return(
        <TouchableOpacity className="bg-white dark:bg-black 
            shadow-md rounded-md m-2 p-2"
            onPress={handleCardClick}>

                <CategoryCard
                    id    = {id}
                    name  = {name}
                    image = {image} 
                />
                
        </TouchableOpacity>
    )
}