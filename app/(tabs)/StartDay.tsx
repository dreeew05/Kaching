import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import StartDayComponent from '../../components/StartDay/StartDayComponent';

export default function StartDayInput() {
  return (
    <Provider store={Store}>
      <StartDayComponent/>
    </Provider>
  )
}
