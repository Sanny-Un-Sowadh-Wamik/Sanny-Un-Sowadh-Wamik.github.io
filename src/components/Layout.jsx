import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';
import ParticleBackground from './ParticleBackground';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <ParticleBackground />
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
