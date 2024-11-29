import * as Icons from 'react-icons/fa6';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Calendar from '../../../components/calendar/calendar';
import { Calendar as CalendarType } from '../../../types/calendar.types';
import Tag from '../../../components/tag/tag';
import { db } from '../../../lib/firebase';

export default function Calendars() {
  const [calendars, setCalendars] = useState<Array<CalendarType>>([]);

  const fetchCalendars = async () => {
    await getDocs(collection(db, 'calendars')).then((querySnapshot) => {
      const data: Array<CalendarType> = [];

      querySnapshot.docs.forEach((doc) => {
        const calendar = {
          id: doc.id,
          title: doc.data().title,
          celebrationDate: doc.data().celebrationDate,
          icon: doc.data().icon,
        };

        data.unshift(calendar);
      });

      setCalendars(data);
    });
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  if (calendars?.length <= 0) {
    return <></>;
  }

  return (
    <>
      {calendars.map((calendar: CalendarType) => {
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
    </>
  );
}
