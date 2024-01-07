import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import ModifyItem from '../../components/Product/ModifyItem';
import { useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';

export default function AddItemScreen() {

  const param = useLocalSearchParams();
  const id = ParamsToInteger(param.id)

  return (
    <Provider store={Store}>
      <ModifyItem
        type={'add'}
        id={id}
      />
    </Provider>
  );
}
