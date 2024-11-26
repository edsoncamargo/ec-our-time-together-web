import './navbar.scss';

import { FaCalendar, FaPlay } from 'react-icons/fa6';

import Button from '../../components/button/button';
import Calendar from '../../components/calendar/calendar';
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
          <li>
            <Button onClick={handleModalOpen}>
              <Button.Icon>
                <FaCalendar />
              </Button.Icon>
            </Button>
          </li>

          <li>
            <Button>
              <Button.Icon>
                <FaPlay />
              </Button.Icon>
            </Button>
          </li>
        </ul>
      </nav>

      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        <Calendar celebrationDate='11-24'></Calendar>
        <Calendar celebrationDate='11-24'></Calendar>
      </Modal>
    </>
  );
}
