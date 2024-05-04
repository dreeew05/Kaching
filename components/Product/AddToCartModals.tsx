import { PopUpModal } from '../Modals/PopUpModal';
import { AddToCartModalsProps } from '../__utils__/interfaces/AddToCartModalProps';

export const AddToCartModals = (item: AddToCartModalsProps) => {
  return (
    <>
      <PopUpModal
        visible={item.isAddModal}
        message="Item added to cart"
        text={'Done'}
        link={null}
        id={0}
        color="green"
        closeModal={() => item.showAddModal(false)}
      />

      <PopUpModal
        visible={item.isAddQuantityModal}
        message="Please add quantity first."
        text={'Dismiss'}
        link={null}
        id={0}
        color="red"
        closeModal={() => item.showAddQuantityModal(false)}
      />

      <PopUpModal
        visible={item.isNeedStartDayModal}
        message="Please tap on Start Day in home page."
        text={'Dismiss'}
        link={null}
        id={0}
        color="red"
        closeModal={() => item.showNeedStartDayModal(false)}
      />

      {/* UNUSED MODAL */}
      {/* <PopUpModal
        visible={item.isItemInCartModal}
        message="Item already in cart."
        text={'Dismiss'}
        link={null}
        id={0}
        color="red"
        closeModal={() => item.showItemInCartModal(false)}
      /> */}
    </>
  );
};
