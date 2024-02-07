import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import ModifyItem from '../../components/Product/ModifyItem';

export default function EditItemScreen() {
  return (
    <Provider store={Store}>
      <ModifyItem type="edit" />
    </Provider>
  );
}
