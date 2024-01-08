import { Provider, useDispatch, useSelector } from "react-redux";
import { Store } from "../../redux/Store";
import DetailedItemScreen from "./DetailedItemScreen";
import { getDatabase } from "../DatabaseUtils/OpenDatabase";
import { useEffect, useState } from "react";
import { DetailedItemProps } from "../__utils__/interfaces/DetailedItemProps";
import { selectIsEditDetailedViewLoading, selectSpecificProduct } from "../../redux/GlobalStateRedux/GlobalStateSelectors";
import { ActivityIndicator, View } from "react-native";
import { setIsDetailedViewLoading } from "../../redux/GlobalStateRedux/GlobalStateSlice";
interface ItemScreenFetchDataProps {
    id : number
}

export default function ItemScreenFetchData(data : ItemScreenFetchDataProps) {

    const db = getDatabase();

    const specificProduct = useSelector(selectSpecificProduct);

    const isLoading = useSelector(selectIsEditDetailedViewLoading);

    const dispatch = useDispatch();

    const [product, setProduct] = useState<DetailedItemProps[]>([{
        id: 0,
        name: '',
        image: '../../assets/icons/blank.jpg',
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
                    setProduct(result.rows._array);
                    dispatch(
                        setIsDetailedViewLoading(false)
                    );
                }
            )
        })
    }, [specificProduct]);

    const showComponent = () => {
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
            return (
                <DetailedItemScreen
                    key={product[0].id}
                    id={product[0].id}
                    name={product[0].name}
                    image={product[0].image}
                    price={product[0].price}
                    description={product[0].description}
                    category={product[0].category}
                />
            )
        }
    }

    return (
        <Provider store={Store}>
            {showComponent()}
        </Provider>
    );
      
}