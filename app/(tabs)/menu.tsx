import { Provider } from 'react-redux';
import MenuComponent from '../../components/Menu/MenuComponent';
import { Store } from '../../redux/Store';

export default function MenuSettings() {
  return (
    <Provider store={Store}>
      <MenuComponent />
    </Provider>
  );
}
