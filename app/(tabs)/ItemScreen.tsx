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
