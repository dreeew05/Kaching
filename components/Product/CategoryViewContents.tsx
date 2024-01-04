import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import TestProductInterface from "../../utils/testProductInterface";
import ItemCard from "./ItemCard";
import testAppetizerData from "../../utils/testAppetizerData";
import testBeverageData from "../../utils/testBeveragesData";
import constantProductImages from "../../constants/Products";
import { selectProducts } from "../DatabaseUtils/FetchInstructions/SelectProducts";

interface CategoryViewContentsProps {
    id : number,
    name : string,
    type : string
}

export default function CategoryViewContents(data : CategoryViewContentsProps) {

    const isEditComponent = data.type === 'edit';

    const products = selectProducts(data.id);
    console.log(products)

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
                    return <ItemCard key={product.id} item={product}/>
                })}
            </ScrollView>
        </View>
    )

}