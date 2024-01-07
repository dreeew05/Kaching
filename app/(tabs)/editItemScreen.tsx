import { Provider } from "react-redux";
import { Store } from "../../redux/Store";
import ModifyItem from "../../components/Product/ModifyItem";
import { useLocalSearchParams } from "expo-router";
import ParamsToInteger from "../../components/__utils__/helper/ParamsToInteger";

export default function EditItemScreen() {

    const param = useLocalSearchParams();

    return (
        <Provider store={Store}>
            <ModifyItem
                type={'edit'}
                id={ParamsToInteger(param.id)}
            />
        </Provider>
    )
}