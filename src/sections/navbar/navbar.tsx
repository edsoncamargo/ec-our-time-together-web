import './navbar.scss';

import * as Icons from 'react-icons/fa6';

import Button from '../../components/button/button';
import Calendars from './components/calendars';
import Cinema from './components/cinema';
import Modal from '../../components/modal/modal';
import { useState } from 'react';

export default function Navbar() {
  const [isModalCalendarsOpen, setIsModalCalendarsOpen] =
    useState<boolean>(false);
  const [isModalCinemaOpen, setIsModalCinemaOpen] = useState<boolean>(false);

  function handleModalCalendarsOpen() {
    setIsModalCalendarsOpen(true);
  }

  function handleModalCalendarsClose() {
    setIsModalCalendarsOpen(false);
  }

  function handleModalCinemaOpen() {
    setIsModalCinemaOpen(true);
  }

  function handleModalCinemaClose() {
    setIsModalCinemaOpen(false);
  }

  return (
    <>
      <nav className='ec-navbar'>
        <ul>
          <li data-aos='fade-up'>
            <Button onClick={handleModalCalendarsOpen}>
              <Button.Icon>
                <Icons.FaCalendar />
              </Button.Icon>
            </Button>
          </li>

          <li data-aos='fade-up' data-aos-delay='25'>
            <Button onClick={handleModalCinemaOpen}>
              <Button.Icon>
                <Icons.FaPlay />
              </Button.Icon>
            </Button>
          </li>
        </ul>
      </nav>

      <Modal
        isOpen={isModalCalendarsOpen}
        handleClose={handleModalCalendarsClose}
      >
        <div className='ec-navbar__calendars'>
          <h1 className='ec-norican ec-norican--overflow'>
            próximo dia especial.
          </h1>

          <Calendars />
        </div>
      </Modal>

      <Modal isOpen={isModalCinemaOpen} handleClose={handleModalCinemaClose}>
        <Cinema />
      </Modal>
    </>
  );
}
