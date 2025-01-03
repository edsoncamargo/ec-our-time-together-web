import 'aos/dist/aos.css';

import AOS from 'aos';
import AudioPlayer from './sections/audio-player/audio-player.tsx';
import Footer from './components/footer/footer.tsx';
import Home from './sections/home/home.tsx';
import Navbar from './sections/navbar/navbar.tsx';
import Timers from './sections/timers/timers.tsx';

AOS.init();

function Root() {
  return (
    <main>
      <Home />

      <article className='ec-content'>
        <Navbar />
        <Timers />
        <AudioPlayer />
      </article>

      <Footer />
    </main>
  );
}

export default Root;
