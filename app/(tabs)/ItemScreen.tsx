import { useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import ItemScreenFetchData from '../../components/Product/ItemScreenFetchData';

export default function ItemScreen() {

  const param = useLocalSearchParams();
  const id = ParamsToInteger(param.id);

  return(
    <Provider store={Store}>
      <ItemScreenFetchData
        id={id}
      />
    </Provider>
  )
}
