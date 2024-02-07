import { useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import ItemScreenFetchData from '../../components/Product/ItemScreenFetchData';

export default function ItemScreen() {
  return (
    <Provider store={Store}>
      <ItemScreenFetchData />
    </Provider>
  );
}
