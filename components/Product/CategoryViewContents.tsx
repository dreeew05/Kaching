import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, Pressable, ScrollView } from "react-native";
import TestProductInterface from "../../utils/testProductInterface";

import testAppetizerData from "../../utils/testAppetizerData";
import testBeverageData from "../../utils/testBeveragesData";
import constantProductImages from "../../constants/Products";
import ItemCard from "./ItemCard";

interface CategoryViewContentsProps {
    id : number,
    name : string,
    type : string
}

// TEST
// [START]
interface productProps {
name : string,
data : TestProductInterface[]
}

interface testDataProps {
[id : number] : productProps
}

const testData : testDataProps = {
10000 : {
    name : 'Appetizer', 
    data: testAppetizerData
},
10001 : {
    name: 'Beverages',
    data: testBeverageData
}
}

  const products : TestProductInterface[] = testData[10000].data;

export default function CategoryViewContents(data : CategoryViewContentsProps) {

    const isEditComponent = data.type === 'edit';

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
                product.image = constantProductImages[product.id];
                return <ItemCard key={product.id} item={product}/>
            })}
            </ScrollView>
        </View>
    )

}