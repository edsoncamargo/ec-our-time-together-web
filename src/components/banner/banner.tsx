import './banner.scss';

import HeartAnimation from '../lottie/heart-animation/heart-animation';
import HeartPulsingAnimation from '../lottie/heart-pulsing-animation/heart-pulsing-animation';

export default function Banner() {
  return (
    <div className='ec-banner'>
      <div className='ec-banner__animations'>
        <em className='ec-banner__heart-animation ec-banner__heart-animation--pulsing'>
          <HeartPulsingAnimation />
        </em>

        <em className='ec-banner__heart-animation ec-banner__heart-animation--one'>
          <HeartAnimation />
        </em>

        <em className='ec-banner__heart-animation ec-banner__heart-animation--two'>
          <HeartAnimation />
        </em>

        <em className='ec-banner__heart-animation ec-banner__heart-animation--three'>
          <HeartAnimation />
        </em>
      </div>
    </div>
  );
}
