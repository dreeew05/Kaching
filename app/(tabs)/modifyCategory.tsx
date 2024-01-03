import { Provider } from "react-redux";
import ModifyCategory from "../../components/Category/ModifyCategory";
import { Store } from "../../redux/Store";

export default function modifyCategory() {
  return(
    <Provider store={Store}>
      <ModifyCategory/>
    </Provider>
  )
}