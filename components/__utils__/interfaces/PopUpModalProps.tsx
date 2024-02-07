import { BaseModalProps } from './BaseModalProps';

export interface PopUpModalProps extends BaseModalProps {
  text: String;
  link: string | null;
  id: number;
}
