import 'aos/dist/aos.css';

import { createContext, useEffect, useState } from 'react';

import AOS from 'aos';
import AudioPlayer from './sections/audio-player/audio-player.tsx';
import Footer from './components/footer/footer.tsx';
import Home from './sections/home/home.tsx';
import Modal from './components/modal/modal.tsx';
import Navbar from './sections/navbar/navbar.tsx';
import Timers from './sections/timers/timers.tsx';
import { Wedding } from './components/wedding/wedding.tsx';

AOS.init();

export const WeddingContext = createContext(null);

function Root() {
  const [isModalWeddingOpen, setIsModalWeddingOpen] = useState<boolean>(false);
  const [isWeddingActive, setIsWeddingActive] = useState(false);

  async function handleModalWeddingOpen() {
    setTimeout(() => {
      setIsModalWeddingOpen(true);
    }, 2000);
  }

  function handleModalCinemaClose() {
    setIsModalWeddingOpen(false);
  }

  useEffect(() => {
    handleModalWeddingOpen();
  }, []);

  return (
    <>
      <WeddingContext.Provider value={{ isWeddingActive }}>
        <main>
          <Home />

          <article className='ec-content'>
            <Navbar />
            <Timers />
            <AudioPlayer />
          </article>

          <Footer />
        </main>

        <Modal isOpen={isModalWeddingOpen} handleClose={handleModalCinemaClose}>
          <Wedding
            onYes={() => {
              handleModalCinemaClose();
              setIsWeddingActive(true);
            }}
          />
        </Modal>
      </WeddingContext.Provider>
    </>
  );
}

export default Root;
