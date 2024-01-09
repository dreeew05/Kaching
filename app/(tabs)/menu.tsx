import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import MenuComponent from '../../components/Menu/MenuComponent';

export default function MenuSettings() {
  return (
    <Provider store={Store}>
      <MenuComponent/>
    </Provider>
  )
}
