import { Provider, useSelector } from "react-redux";
import { Store } from "../../redux/Store";
import { selectSpecificProduct } from "../DatabaseUtils/FetchInstructions/SelectProducts";
import DetailedItemScreen from "./DetailedItemScreen";
import { View } from "../Themed";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { useEffect, useState } from "react";
import { DetailedItemProps } from "../__utils__/interfaces/DetailedItemProps";
import { useLocalSearchParams } from "expo-router";
import ParamsToInteger from "../__utils__/helper/ParamsToInteger";
import { selectProduct } from "../../redux/GlobalStateRedux/GlobalStateSelectors";

interface ItemScreenFetchDataProps {
    id : number
}

export default function ItemScreenFetchData(data : ItemScreenFetchDataProps) {

    // const param = useLocalSearchParams();
    // const id = ParamsToInteger(param.id);

    const db = getDatabase();

    const actionState = useSelector(selectProduct)

    const [product, setProduct] = useState<DetailedItemProps[]>([{
        id: 0,
        name: '',
        image: '',
        price: 0,
        description: '',
        category: ''
    }]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT item.id, item.name, item.description, item.image, 
                item.price,
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
    }, [actionState])

    console.log(product)

    return (
        <Provider store={Store}>
            <DetailedItemScreen
                id={product[0].id}
                name={product[0].name}
                image={product[0].image}
                price={product[0].price}
                description={product[0].description}
                category={product[0].category}
            />
        </Provider>
    );

}