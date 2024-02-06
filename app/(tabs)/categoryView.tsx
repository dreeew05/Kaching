import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import CategoryView from '../../components/Product/CategoryView';

export default function CategoryViewScreen() {
  return (
    <Provider store={Store}>
      <CategoryView />
    </Provider>
  );
}
