import { useEffect, useState } from "react";
import { getDatabase } from "../OpenDatabase"
import { CategoryProps } from "../../__utils__/interfaces/CategoryProps";
import { View, Text } from "../../Themed";

export default function GenerateAllData() {
    const db = getDatabase();
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    // const [productData, setProductData]

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT *
                FROM category`,
                [],
                (_, result) => {
                    setCategories(result.rows._array);
                }
            );
        });
    }, []);

    // console.log(categories)

    const test = 'hello';

    return(
        <View>
            <Text>
                {JSON.stringify(categories)}
            </Text>
        </View>
    )

    // Now you can use 'categories' in your component's render method
    // return <YourComponent categories={categories} />;
}
