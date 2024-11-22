import './timer.scss';

import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// Configuração do Day.js
dayjs.extend(utc);
dayjs.extend(timezone);

interface TimerProps {
  startDate: string;
}

export default function Timer({ startDate }: Readonly<TimerProps>) {
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const start = dayjs.utc(startDate).tz('America/Sao_Paulo');
    const updateElapsedTime = () => {
      const now = dayjs().tz('America/Sao_Paulo');

      setElapsed({
        days: now.diff(start, 'day'),
        hours: now.diff(start, 'hour') % 24,
        minutes: now.diff(start, 'minute') % 60,
        seconds: now.diff(start, 'second') % 60,
      });
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const itemAnimation = {
    initial: { opacity: 0, y: -8, filter: 'blur(2px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 8 },
    transition: { duration: 0.6 },
  };

  const splitDigits = (num: number | string) => num.toString().split('');

  return (
    <div className='ec-timer'>
      <div className='ec-timer__top'>
        <div className='ec-timer__time'>
          <div className='ec-timer__time__box'>
            {splitDigits(
              String(elapsed.days).length <= 1
                ? '0'.concat(String(elapsed.days))
                : String(elapsed.days)
            ).map((digit, index) => (
              <div className='ec-timer__time__value' key={digit + index}>
                <motion.p {...itemAnimation}>{digit}</motion.p>
              </div>
            ))}
          </div>

          <p className='ec-timer__time__title'>dias</p>
        </div>
      </div>

      <div className='ec-timer__bottom'>
        <div className='ec-timer__time'>
          <div className='ec-timer__time__box'>
            {splitDigits(
              String(elapsed.hours).length <= 1
                ? '0'.concat(String(elapsed.hours))
                : String(elapsed.hours)
            ).map((digit, index) => (
              <div className='ec-timer__time__value' key={digit + index}>
                <motion.p {...itemAnimation}>{digit}</motion.p>
              </div>
            ))}
          </div>

          <p className='ec-timer__time__title'>horas</p>
        </div>

        <span className='ec-timer__time__separator'>:</span>

        <div className='ec-timer__time'>
          <div className='ec-timer__time__box'>
            {splitDigits(
              String(elapsed.minutes).length <= 1
                ? '0'.concat(String(elapsed.minutes))
                : String(elapsed.minutes)
            ).map((digit, index) => (
              <div className='ec-timer__time__value' key={digit + index}>
                <motion.p {...itemAnimation}>{digit}</motion.p>
              </div>
            ))}
          </div>

          <p className='ec-timer__time__title'>minutos</p>
        </div>

        <span className='ec-timer__time__separator'>:</span>

        <div className='ec-timer__time'>
          <div className='ec-timer__time__box'>
            {splitDigits(
              String(elapsed.seconds).length <= 1
                ? '0'.concat(String(elapsed.seconds))
                : String(elapsed.seconds)
            ).map((digit, index) => (
              <div className='ec-timer__time__value' key={digit + index}>
                <motion.p {...itemAnimation}>{digit}</motion.p>
              </div>
            ))}
          </div>

          <p className='ec-timer__time__title'>segundos</p>
        </div>
      </div>
    </div>
  );
}
