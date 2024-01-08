import { Provider } from "react-redux";
import { Store } from "../../redux/Store";
import EditStoreNameComponent from "../../components/Home/EditStoreNameComponent";

export default function EditStoreNameWrapper() {
  return(
    <Provider store={Store}>
      <EditStoreNameComponent/>
    </Provider>
  )
  
}
