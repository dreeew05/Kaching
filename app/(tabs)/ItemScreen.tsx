import { useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { useEffect, useState } from 'react';
import { DetailedItemProps } from '../../components/__utils__/interfaces/DetailedItemProps';
import DetailedItemScreen from '../../components/Product/DetailedItemScreen';

export default function ItemScreen() {
  const param = useLocalSearchParams();
  const id = ParamsToInteger(param.id);

  const db = getDatabase();

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
                [id],
                (_, result) => {
                    setProduct(result.rows._array)
                }
            )
        })
    }, [id])

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
  
  // return(
  //   <View></View>
  // )
}
