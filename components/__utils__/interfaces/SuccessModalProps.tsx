import { PopUpModalProps } from './PopUpModalProps';

export interface SuccessModalProps extends PopUpModalProps {
  link: string | null;
  id: number;
}
