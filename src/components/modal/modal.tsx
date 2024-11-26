import './modal.scss';

import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export default function Modal({
  children,
  isOpen,
  handleClose,
}: Readonly<ModalProps>) {
  return (
    <>
      <div className='ec-modal' data-open={isOpen} aria-hidden={!isOpen}>
        <div className='ec-modal__content'>{children}</div>
      </div>

      <button
        className='ec-modal__overlay'
        data-open={isOpen}
        aria-hidden={!isOpen}
        onClick={handleClose}
      ></button>
    </>
  );
}
