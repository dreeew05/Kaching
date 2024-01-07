import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import TabOneScreen from './receipt';

export default function PaymentProvider() {

  return (
    <Provider store={Store}>
      <TabOneScreen/>
    </Provider>
  );
}
