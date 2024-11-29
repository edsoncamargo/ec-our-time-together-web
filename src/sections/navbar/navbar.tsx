import './navbar.scss';

import * as Icons from 'react-icons/fa6';

import Button from '../../components/button/button';
import { CALENDARS } from '../../data/calendars.data';
import Calendar from '../../components/calendar/calendar';
import { Calendar as CalendarType } from '../../types/calendar.types';
import Modal from '../../components/modal/modal';
import Tag from '../../components/tag/tag';
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
                <Icons.FaCalendar />
              </Button.Icon>
            </Button>
          </li>

          <li>
            <Button>
              <Button.Icon>
                <Icons.FaPlay />
              </Button.Icon>
            </Button>
          </li>
        </ul>
      </nav>

      <Modal isOpen={isModalOpen} handleClose={handleModalClose}>
        {CALENDARS.map((calendar: CalendarType) => {
          const Icon = Icons[calendar.icon as keyof typeof Icons];

          return (
            <Tag key={calendar.title}>
              <Tag.Header>
                <Tag.Title>{calendar.title}</Tag.Title>

                <Tag.Icon>
                  <Icon />
                </Tag.Icon>
              </Tag.Header>

              <Calendar celebrationDate={calendar.celebrationDate}></Calendar>
            </Tag>
          );
        })}
      </Modal>
    </>
  );
}
