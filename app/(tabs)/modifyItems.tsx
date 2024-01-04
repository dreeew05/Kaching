import { useLocalSearchParams } from "expo-router";
import ParamsToInteger from "../../components/__utils__/helper/ParamsToInteger";
import CategoryViewHeader from "../../components/Product/CategoryViewContents";
import { Provider } from "react-redux";
import { Store } from "../../redux/Store";

export default function ModifyItems() {

    const param = useLocalSearchParams();

    const id : number = ParamsToInteger(param.id);
    const categoryName = param.category.toString();

    return (
        <Provider store={Store}>
            <CategoryViewHeader
                id={id}
                name={categoryName}
                type={'add'}
            />
        </Provider>
    )
}