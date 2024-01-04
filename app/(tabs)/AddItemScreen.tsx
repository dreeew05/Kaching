import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import AddItem from '../../components/Product/AddItem';

export default function AddItemScreen() {

  return (
    <Provider store={Store}>
      <AddItem/>
    </Provider>
  );
}
