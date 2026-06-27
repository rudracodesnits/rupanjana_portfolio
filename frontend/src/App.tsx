import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/Cursor/CustomCursor';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Gallery from './components/Gallery/Gallery';
import Measurements from './components/Measurements/Measurements';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Gallery />
        <Measurements />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
