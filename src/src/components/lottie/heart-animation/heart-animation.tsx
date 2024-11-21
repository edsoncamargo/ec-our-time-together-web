import { useEffect, useRef } from 'react';

import animationData from '../../../assets/animations/heart.json';
import lottie from 'lottie-web';

export default function HeartAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }

    return () => lottie.destroy();
  }, []);

  return <div ref={container} style={{ width: '100%', height: '100%' }} />;
}
