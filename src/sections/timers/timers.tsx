import './timers.scss';

import * as Icons from 'react-icons/fa6';

import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Tag from '../../components/tag/tag';
import { Timer } from '../../types/timer.types';
import { db } from '../../lib/firebase';

export default function Timers() {
  const [timers, setTimers] = useState<Array<Timer>>([]);

  const fetchTimers = async () => {
    await getDocs(collection(db, 'timers')).then((querySnapshot) => {
      const data: Array<Timer> = [];

      querySnapshot.docs.forEach((doc) => {
        const timer = {
          id: doc.id,
          title: doc.data().title,
          startDate: doc.data().startDate,
          icon: doc.data().icon,
        };

        data.push(timer);
      });

      const sortedData = [...data].sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );

      setTimers(sortedData);
    });
  };

  useEffect(() => {
    fetchTimers();
  }, []);

  if (timers?.length <= 0) {
    return <div className='ec-timers'></div>;
  }

  return (
    <article className='ec-timers' data-aos='fade-up'>
      <h1 className='ec-norican ec-norican--overflow'>nosso tempo juntos.</h1>

      {timers.map((timer: Timer, index) => {
        const Icon = Icons[timer.icon.trim() as keyof typeof Icons];

        return (
          <div key={timer.title} data-aos={index !== 0 ? 'fade-up' : undefined}>
            <Tag>
              <Tag.Header>
                <Tag.Title>{timer.title}</Tag.Title>

                <Tag.Icon>
                  <Icon />
                </Tag.Icon>
              </Tag.Header>

              <Tag.Body startDate={timer.startDate} />
            </Tag>
          </div>
        );
      })}
    </article>
  );
}
