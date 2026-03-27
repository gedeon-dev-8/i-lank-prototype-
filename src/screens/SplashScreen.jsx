import { useEffect, useState } from 'react';
import '../styles/splash.scss';

/**
 * SplashScreen
 * Overlays the phone content via position:absolute — shell height never changes.
 *
 * Phase timeline:
 *   0ms    → 'dark'  — green fills screen, logo fades up
 *   1200ms → 'wipe'  — green curtain slides out left, white slides in right
 *   2000ms → 'light' — white full screen holds
 *   3000ms → 'exit'  — whole splash fades + scales away
 *   3400ms → onDone() — component unmounts
 */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState('dark');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('wipe'),  1200),
      setTimeout(() => setPhase('light'), 2000),
      setTimeout(() => setPhase('exit'),  3000),
      setTimeout(() => onDone(),          3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <div className={`splash splash--${phase}`} aria-hidden="true">
      {/* Green panel */}
      <div className="splash__panel splash__panel--green">
        <Logo light />
      </div>

      {/* White panel */}
      <div className="splash__panel splash__panel--white">
        <Logo />
      </div>
    </div>
  );
}

function Logo({ light = false }) {
  return (
    <div className={`splash__logo${light ? ' splash__logo--light' : ''}`}>
      <Pin />
      <div className="splash__wordmark">
        <span className="splash__i">i</span>
        <span className="splash__sep"> – </span>
        <span className="splash__lank">LANK</span>
      </div>
      <p className="splash__tagline">Find Taxis Faster, Ride Smarter</p>
    </div>
  );
}

function Pin() {
  return (
    <svg
      className="splash__pin"
      width="32"
      height="40"
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24S32 28 32 16C32 7.163 24.837 0 16 0z"
        fill="#f5c518"
      />
      <circle cx="16" cy="16" r="6" fill="white" />
    </svg>
  );
}