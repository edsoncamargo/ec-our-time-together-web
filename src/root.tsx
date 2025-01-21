import 'aos/dist/aos.css';

import { useEffect, useMemo, useState } from 'react';

import AOS from 'aos';
import AudioPlayer from './sections/audio-player/audio-player.tsx';
import Footer from './components/footer/footer.tsx';
import Home from './sections/home/home.tsx';
import Modal from './components/modal/modal.tsx';
import Navbar from './sections/navbar/navbar.tsx';
import Timers from './sections/timers/timers.tsx';
import { Wedding } from './components/wedding/wedding.tsx';
import { WeddingContext } from './contexts/wedding.context.tsx';

function Root() {
  const [isModalWeddingOpen, setIsModalWeddingOpen] = useState<boolean>(false);
  const [isWeddingActive, setIsWeddingActive] = useState<boolean>(false);

  const weddingContextValue = useMemo(
    () => ({ isWeddingActive, setIsWeddingActive }),
    [isWeddingActive, setIsWeddingActive]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalWeddingOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    setTimeout(() => {
      handleScrollToTop();
    }, 250);

    AOS.init();
  }, []);

  function handleWeddingConfirm() {
    setIsModalWeddingOpen(false);
    setIsWeddingActive(true);
  }

  return (
    <WeddingContext.Provider value={weddingContextValue}>
      <main>
        <Home />

        <article className='ec-content'>
          <Navbar />
          <Timers />
          <AudioPlayer />
        </article>

        <Footer />
      </main>

      <Modal
        isOpen={isModalWeddingOpen}
        handleClose={() => setIsModalWeddingOpen(false)}
      >
        <Wedding onYes={handleWeddingConfirm} />
      </Modal>
    </WeddingContext.Provider>
  );
}

export default Root;
