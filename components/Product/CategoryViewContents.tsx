import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import ItemCard from "./ItemCard";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { useEffect, useState } from "react";
import { BaseItemProps } from "../__utils__/interfaces/BaseItemProps";
import { useSelector } from "react-redux";
import { selectProduct } from "../../redux/GlobalStateRedux/GlobalStateSelectors";

interface CategoryViewContentsProps {
    id : number,
    name : string,
    type : string
}

export default function CategoryViewContents(data : CategoryViewContentsProps) {

    const isEditComponent = data.type === 'edit';

    const db = getDatabase();

    const actionState = useSelector(selectProduct);

    const [products, setProducts] = useState<BaseItemProps[]>([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT item.id, item.name, item.price, item.image,
                 category.name AS 'category'
                 FROM item
                 LEFT JOIN category ON item.category_id = category.id
                 WHERE category.id = ?
                 ORDER BY item.name ASC`,
                [data.id],
                (_, result) => {
                    setProducts(result.rows._array)
                }
            )
        })
    }, [actionState])

    return(
        <View className="flex-1 self-stretch bg-white dark:bg-black">
            <View className='flex flex-row'>
            <Text className="text-4xl text-green ml-5 mb-5"
                style={{ fontFamily: 'Poppins-Bold' }}
            >
                {data.name}
            </Text>
                {isEditComponent ? (
                    <Link href={{
                        pathname : '/(tabs)/modifyItems',
                        params : {
                            id : data.id,
                            category : data.name
                        }
                        }} asChild>
        
                        <Pressable className="ml-3">
                            <FontAwesome5 name="edit" size={25} color="darkgreen" />
                        </Pressable>
        
                    </Link>
                ) : 
                (
                    <Link href={{
                        pathname : '/(tabs)/AddItemScreen',
                        params : {
                            id : data.id,
                            category : data.name
                        }
                        }} asChild>
        
                        <Pressable className="ml-3">
                            <FontAwesome5 name="plus" size={25} color="darkgreen" />
                        </Pressable>
        
                    </Link>
                )}
            </View>
            <ScrollView className="p-2">
                {products.map((product) => {
                    return (
                        <ItemCard 
                            key={product.id} 
                            item={product} 
                            isEditComponent={isEditComponent}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )

}