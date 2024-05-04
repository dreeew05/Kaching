import { Provider, useDispatch, useSelector } from 'react-redux';
import { Store } from '../../redux/Store';
import DetailedItemScreen from './DetailedItemScreen';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import { useEffect, useState } from 'react';
import { DetailedItemProps } from '../__utils__/interfaces/DetailedItemProps';
import { selectIsEditDetailedViewLoading } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { ActivityIndicator, View } from 'react-native';
import { setIsDetailedViewLoading } from '../../redux/GlobalStateRedux/GlobalStateSlice';
import { useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../__utils__/helper/ParamsToInteger';

export default function ItemScreenFetchData() {
  const param = useLocalSearchParams();
  const id = ParamsToInteger(param.id);

  const isLoading = useSelector(selectIsEditDetailedViewLoading);

  const dispatch = useDispatch();

  const [product, setProduct] = useState<DetailedItemProps[]>([
    {
      id: 0,
      name: '',
      image: '../../assets/icons/blank.jpg',
      price: 0,
      description: '',
      category: '',
      is_available: 0,
    },
  ]);

  //   Todo: Interface db transaction
  const db = getDatabase();
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT item.id, item.name, item.description, item.image,
                item.price, item.is_available,
                category.name AS 'category'
                FROM item
                LEFT JOIN category ON item.category_id = category.id
                WHERE item.id = ?`,
        [id],
        (_, result) => {
          console.log(result.rows._array);
          setProduct(result.rows._array);
          dispatch(setIsDetailedViewLoading(false));
        },
      );
    });
  }, [param]);

  const showComponent = () => {
    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={75} color="green" />
        </View>
      );
    } else {
      return (
        <DetailedItemScreen
          key={product[0].id}
          id={product[0].id}
          name={product[0].name}
          image={product[0].image}
          price={product[0].price}
          description={product[0].description}
          category={product[0].category}
          is_available={product[0].is_available}
        />
      );
    }
  };

  return <Provider store={Store}>{showComponent()}</Provider>;
}
