import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import ModifyItem from '../../components/Product/ModifyItem';

export default function AddItemWrapper() {
  return (
    <Provider store={Store}>
      <ModifyItem type={'add'} />
    </Provider>
  );
}
