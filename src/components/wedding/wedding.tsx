import './wedding.scss';

import WeddingAnimation from '../lottie/wedding-animation/wedding-animation';
import { useRef } from 'react';

type WeddingType = {
  onYes: () => void;
};

export function Wedding({ onYes }: Readonly<WeddingType>) {
  const eButtonYes = useRef<HTMLButtonElement>(null);

  return (
    <div className='ec-wedding'>
      <h3 className='ec-norican ec-norican--overflow'>
        Quer casar <br></br> comigo?
      </h3>

      <WeddingAnimation />

      <div className='ec-wedding__actions'>
        <button
          ref={eButtonYes}
          className='ec-norican ec-norican--overflow'
          onClick={() => onYes()}
        >
          sim <span>😍</span>
        </button>

        <button
          className='ec-norican ec-norican--overflow'
          onClick={(e) => {
            e.currentTarget.classList.add('ec-wedding__removing');
            setTimeout(() => {
              const rect = eButtonYes.current!.getBoundingClientRect();
              const innerWidth = window.innerWidth;
              const mid = innerWidth / 2;
              const pos = mid - rect.width / 2 - rect.left;

              eButtonYes.current!.style.left = `${pos}px`;
            }, 600);
          }}
        >
          não <span>😭</span>
        </button>
      </div>

      <em className='ec-pattern ec-pattern--glamorous'></em>
    </div>
  );
}
