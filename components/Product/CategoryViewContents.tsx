import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import ItemCard from "./ItemCard";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { useEffect, useState } from "react";
import { BaseItemProps } from "../__utils__/interfaces/BaseItemProps";
import { useDispatch, useSelector } from "react-redux";
import { selectIsEditComponent, selectProduct } from "../../redux/GlobalStateRedux/GlobalStateSelectors";
import { setIsEditComponent } from "../../redux/GlobalStateRedux/GlobalStateSlice";

interface CategoryViewContentsProps {
    id : number,
    name : string,
    type : string
}

export default function CategoryViewContents(data : CategoryViewContentsProps) {

    const db = getDatabase();

    const dispatch = useDispatch();

    const actionState = useSelector(selectProduct);
    const actionStateEdit = useSelector(selectIsEditComponent);

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

    const showModifyProductsComponent = () => {
        if(actionStateEdit && products.length > 0) {
            return (
                <Pressable className="ml-3"
                    onPress={() => dispatch(
                        setIsEditComponent(false)
                    )}
                >
                    <FontAwesome5 name="edit" size={25} 
                        color="darkgreen" 
                    />
                </Pressable>
            )
        }
        else if (!actionStateEdit || products.length == 0) {
            return(
                <Link href={{
                    pathname : '/(tabs)/AddItemScreen',
                    params : {
                        id : data.id,
                    }
                    }} asChild>
        
                    <Pressable className="ml-3"
                        onPress={() => dispatch(
                            setIsEditComponent(true)
                        )}
                    >
                        <FontAwesome5 name="plus" size={25} 
                            color="darkgreen" 
                        />
                    </Pressable>
                </Link>
            )
        }
    }

    return(
        <View className="flex-1 self-stretch bg-white dark:bg-black">
            <View className='flex flex-row'>
            <Text className="text-4xl text-green ml-5 mb-5"
                style={{ fontFamily: 'Poppins-Bold' }}
            >
                {data.name}
            </Text>
                {showModifyProductsComponent()}
            </View>
            <ScrollView className="p-2">
                {products.map((product) => {
                    return (
                        <ItemCard 
                            key={product.id} 
                            item={product} 
                            isEditComponent={actionStateEdit}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )

}