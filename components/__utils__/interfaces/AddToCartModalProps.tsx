import { AddToCartModalPropsMethods } from './AddToCartModalPropsMethods';

export interface AddToCartModalsProps
  extends AddToCartModalPropsMethods {
  isAddModal: boolean;
  isAddQuantityModal: boolean;
  isItemInCartModal: boolean;
  isNeedStartDayModal: boolean;
  showAddModal: (isClose: boolean) => void;
  showAddQuantityModal: (isClose: boolean) => void;
  showItemInCartModal: (isClose: boolean) => void;
  showNeedStartDayModal: (isClose: boolean) => void;
}
