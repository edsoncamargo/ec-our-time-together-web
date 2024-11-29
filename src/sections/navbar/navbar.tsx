import './navbar.scss';

import * as Icons from 'react-icons/fa6';

import Button from '../../components/button/button';
import Calendars from './components/calendars';
import Modal from '../../components/modal/modal';
import { useState } from 'react';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <nav className='ec-navbar'>
        <ul>
          <li data-aos='fade-up'>
            <Button onClick={handleModalOpen}>
              <Button.Icon>
                <Icons.FaCalendar />
              </Button.Icon>
            </Button>
          </li>

          <li data-aos='fade-up' data-aos-delay='25'>
            <Button>
              <Button.Icon>
                <Icons.FaPlay />
              </Button.Icon>
            </Button>
          </li>
        </ul>
      </nav>

      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <h1 className='ec-norican ec-norican--overflow'>
          próximo dia especial.
        </h1>
        <Calendars />
      </Modal>
    </>
  );
}
