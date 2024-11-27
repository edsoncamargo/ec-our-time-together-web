import './modal.scss';

import { ReactNode, useEffect, useState } from 'react';

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
  const [modalVisible, setModalVisible] = useState(isOpen);

  useEffect(() => {
    handleBodyOverflow();

    function handleBodyOverflow() {
      if (modalVisible) {
        document.querySelector('body')!.style.overflow = 'hidden';
      } else {
        document.querySelector('body')!.style.overflow = 'auto';
      }
    }
  }, [modalVisible]);

  useEffect(() => {
    if (isOpen !== modalVisible) setModalVisible(isOpen);
  }, [isOpen, modalVisible]);

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
