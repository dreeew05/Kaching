import { Provider } from "react-redux";
import { Store } from "../../redux/Store";
import PaymentComponent from "../../components/Payment/PaymentComponent";

export default function paymentWrapper() {
  return (
    <Provider store={Store}>
      <PaymentComponent/>
    </Provider>
  )  
}
