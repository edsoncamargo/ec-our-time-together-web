import './timers.scss';

import * as Icons from 'react-icons/fa6';

import { TIMERS } from '../../data/timers.data';
import Tag from '../../components/tag/tag';
import { Timer } from '../../types/timer.types';

export default function Timers() {
  return (
    <article className='ec-timers'>
      <h1 className='ec-timers__title ec-norican'>nosso tempo juntos.</h1>

      {TIMERS.map((timer: Timer) => {
        const Icon = Icons[timer.icon as keyof typeof Icons];

        return (
          <Tag key={timer.title}>
            <Tag.Header>
              <Tag.Title>{timer.title}</Tag.Title>

              <Tag.Icon>
                <Icon />
              </Tag.Icon>
            </Tag.Header>

            <Tag.Body startDate={timer.startDate} />
          </Tag>
        );
      })}
    </article>
  );
}
