import Footer from './components/footer/footer.tsx';
import Home from './sections/home/home.tsx';
import Navbar from './sections/navbar/navbar.tsx';
import Timers from './sections/timers/timers.tsx';

function Root() {
  return (
    <main>
      <Home />

      <article className='ec-content'>
        <Navbar />
        <Timers />
      </article>

      <Footer />
    </main>
  );
}

export default Root;
