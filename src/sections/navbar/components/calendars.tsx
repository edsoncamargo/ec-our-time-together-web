import * as Icons from 'react-icons/fa6';

import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Calendar from '../../../components/calendar/calendar';
import { Calendar as CalendarType } from '../../../types/calendar.types';
import Tag from '../../../components/tag/tag';
import { db } from '../../../lib/firebase';
import services from '../../../lib/days';

export default function Calendars() {
  const [calendars, setCalendars] = useState<Array<CalendarType>>([]);

  const fetchCalendars = async () => {
    await getDocs(collection(db, 'calendars')).then((querySnapshot) => {
      const data: Array<CalendarType> = [];

      querySnapshot.docs.forEach((doc) => {
        const adjustedDate = getNextCelebrationDate(doc);
        const calendar = {
          id: doc.id,
          title: doc.data().title,
          celebrationDate: `${adjustedDate.get('year')}-${
            doc.data().celebrationDate
          }`,
          icon: doc.data().icon,
        };

        data.push(calendar);
      });

      const sortedData = [...data].sort(
        (a, b) =>
          new Date(a.celebrationDate).getTime() -
          new Date(b.celebrationDate).getTime()
      );

      setCalendars(sortedData);
    });
  };

  function getNextCelebrationDate(
    doc: QueryDocumentSnapshot<DocumentData, DocumentData>
  ) {
    const currentDate = services.dayjs();

    const currentYear = currentDate.get('year');
    const inputDate = services.dayjs(
      `${currentYear}-${doc.data().celebrationDate}`
    );
    const adjustedDate = inputDate.isBefore(currentDate, 'day')
      ? inputDate.add(1, 'year')
      : inputDate;
    return adjustedDate;
  }

  useEffect(() => {
    fetchCalendars();
  }, []);

  if (calendars?.length <= 0) {
    return <></>;
  }

  return (
    <>
      {calendars.map((calendar: CalendarType) => {
        const Icon = Icons[calendar.icon.trim() as keyof typeof Icons];

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
