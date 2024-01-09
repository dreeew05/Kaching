import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { View, Text, Pressable, ScrollView, ActivityIndicator } from "react-native";
import ItemCard from "./ItemCard";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { useEffect, useState } from "react";
import { BaseItemProps } from "../__utils__/interfaces/BaseItemProps";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCategoryViewLoading, selectIsEditComponent, selectProduct } from "../../redux/GlobalStateRedux/GlobalStateSelectors";
import { setIsCategoryViewProductLoading, setIsEditComponent } from "../../redux/GlobalStateRedux/GlobalStateSlice";

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

    const isLoading = useSelector(selectIsCategoryViewLoading);

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
                    dispatch(
                        setIsCategoryViewProductLoading(false)
                    );
                }
            )
        })
    }, [actionState])

    const showOverallComponent = () => {
        if(isLoading) {
            return(
                <View 
                    style={{ 
                        marginTop: 350 
                    }}
                >
                    <ActivityIndicator
                        size={75}
                        color="green"
                    />
                </View>
            )
        }
        else {
            return(
                <View>
                    {showModifyProductHeader()}
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
    }

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

    const goBackAction = () => {
        dispatch(
            setIsEditComponent(true)
        );
    }

    const showModifyProductHeader = () => {
        // TO DO : Change Style
        if(!actionStateEdit) {
            return (
                <View className="flex-row">
                    <Link
                        href={{
                            pathname : '/(tabs)/categoryView',
                            params : {
                                id : data.id,
                            }
                        }}
                        asChild
                    >
                        <Pressable className="ml-3 mb-2"
                            onPress={() => goBackAction()}
                        >
                            <Ionicons 
                                name="chevron-back" 
                                size={30} 
                                color="green" 
                            />
                        </Pressable>
                    </Link>
                    <Text 
                        style={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 22,
                            color: "darkgreen"
                        }}
                    >
                        Cancel Edit
                    </Text>
                </View>
            )
        }
    }

    return(
        <View className="flex-1 self-stretch bg-white dark:bg-black">
            <View
                style={{marginTop: 60}}
            >
                {showOverallComponent()}
            </View>
        </View>
    )

}