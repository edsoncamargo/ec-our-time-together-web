import './calendar.scss';

import Card from '../card/card';
import { Dayjs } from 'dayjs';
import { FaFaceKissWinkHeart } from 'react-icons/fa6';
import Tag from '../tag/tag';
import services from '../../lib/days';

type DayInfo = {
  day: string;
  isCurrent?: boolean;
  isPrevious: boolean;
};

interface CalendarProps {
  celebrationDate: string;
}

export default function Calendar({ celebrationDate }: Readonly<CalendarProps>) {
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const currentDate = services.dayjs();

  const currentYear = currentDate.get('year');
  const inputDate = services.dayjs(`${currentYear}-${celebrationDate}`);
  const celebrationMonth = inputDate.format('MMM');

  const adjustedDate = inputDate.isBefore(currentDate, 'day')
    ? inputDate.add(1, 'year')
    : inputDate;

  const startOfMonth = adjustedDate.startOf('month');
  const endOfMonth = adjustedDate.endOf('month');

  function getDaysInMonth(startOfMonth: Dayjs, endOfMonth: Dayjs): DayInfo[] {
    const daysInMonth: DayInfo[] = [];
    let currentDate = startOfMonth;

    while (
      currentDate.isBefore(endOfMonth) ||
      currentDate.isSame(endOfMonth, 'day')
    ) {
      daysInMonth.push({
        day: currentDate.format('DD/MM/YYYY'),
        isCurrent: currentDate.isSame(adjustedDate, 'day'),
        isPrevious: false,
      });

      currentDate = currentDate.add(1, 'day');
    }

    return daysInMonth;
  }

  function getEmptyDays(startDay: number, startOfMonth: Dayjs): DayInfo[] {
    const emptyDays: DayInfo[] = [];
    let previousDate = startOfMonth.subtract(startDay, 'days');

    for (let i = 0; i < startDay; i++) {
      emptyDays.push({
        day: previousDate.format('DD/MM/YYYY'),
        isCurrent: false,
        isPrevious: true,
      });

      previousDate = previousDate.add(1, 'day');
    }

    return emptyDays;
  }

  const daysInMonth = getDaysInMonth(startOfMonth, endOfMonth);
  const startDay = startOfMonth.day();
  const emptyDays = getEmptyDays(startDay, startOfMonth);

  return (
    <Tag>
      <Tag.Header>
        <Tag.Title>
          COMEMORAR O <br /> PRIMEIRO BEIJO
        </Tag.Title>

        <Tag.Icon>
          <FaFaceKissWinkHeart />
        </Tag.Icon>
      </Tag.Header>

      <Card>
        <div className='ec-calendar'>
          <h3 className='ec-calendar__title ec-parkinsans'>
            <span>{celebrationMonth}</span> {currentYear}
          </h3>

          <div className='ec-calendar__header'>
            {weekDays.map(function (weekDay: string) {
              return (
                <span key={weekDay} className='ec-calendar__week-day'>
                  {weekDay}
                </span>
              );
            })}
          </div>

          <div className='ec-calendar__body'>
            {emptyDays
              .concat(daysInMonth)
              .map(function (dayInfo: DayInfo, index: number) {
                return (
                  <span
                    key={dayInfo.day + index}
                    className={`ec-calendar__day${
                      dayInfo.isPrevious ? ' ec-calendar__day--previous' : ''
                    }${dayInfo.isCurrent ? ' ec-calendar__day--current' : ''}`}
                  >
                    {dayInfo.day.split('/')[0]}
                  </span>
                );
              })}
          </div>
        </div>
      </Card>
    </Tag>
  );
}
