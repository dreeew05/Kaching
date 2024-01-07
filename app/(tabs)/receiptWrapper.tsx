import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import ReceiptComponent from '../../components/Receipt/ReceiptComponent';

export default function ReceiptWrapper() {

  return (
    <Provider store={Store}>
      <ReceiptComponent/>
    </Provider>
  )
}
