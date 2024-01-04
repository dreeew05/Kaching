import { Provider } from "react-redux";
import { Store } from "../../redux/Store";
import { selectSpecificProduct } from "../DatabaseUtils/FetchInstructions/SelectProducts";
import DetailedItemScreen from "./DetailedItemScreen";
import { View } from "../Themed";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { useEffect, useState } from "react";
import { DetailedItemProps } from "../__utils__/interfaces/DetailedItemProps";

interface ItemScreenFetchDataProps {
    id : number
}

export default function ItemScreenFetchData(data : ItemScreenFetchDataProps) {

    // const product = selectSpecificProduct(data.id)
    // console.log(product[0]);

    const db = getDatabase();

    const [product, setProduct] = useState<DetailedItemProps[]>([]);
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT *,
                category.name AS 'category'
                FROM item
                LEFT JOIN category ON item.category_id = category.id
                WHERE item.id = ?`,
                [data.id],
                (_, result) => {
                    setProduct(result.rows._array)
                }
            )
        })
    }, [])

    console.log(product)

    // return (
    //     <Provider store={Store}>
    //         <DetailedItemScreen
    //             id={product[0].id}
    //             name={product[0].name}
    //             image={product[0].image}
    //             price={product[0].price}
    //             description={product[0].description}
    //             category={product[0].category}
    //         />
    //     </Provider>
    // )

    return (
        <View></View>
    )
}