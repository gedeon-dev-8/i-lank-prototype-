import { useState } from 'react';
import '../styles/onboarding.scss';

import ranksImg from '../assets/svgs/onboarding-ranks.svg';
import mapsImg from '../assets/svgs/onboarding-maps.svg';
import handSignsImg from '../assets/svgs/onboarding-handsigns.svg';
import routeImg from '../assets/svgs/onboarding-route.svg';
import safetyImg from '../assets/svgs/onboarding-safety.svg';

const SLIDES = [
  {
    id: 0,
    title: 'Find Nearby Ranks',
    desc: 'Let us detect taxi ranks near you for quick pick-ups.',
    img: ranksImg,
    alt: 'Person sitting on a map pin near a taxi rank',
  },
  {
    id: 1,
    title: 'Live Maps & Directions',
    desc: 'Get turn-by-turn routes so you reach ranks safely.',
    img: mapsImg,
    alt: 'Person standing next to a phone showing a live map',
  },
  {
    id: 2,
    title: 'Hand Signs Guide',
    desc: 'Learn local taxi hand signs to hail taxis on the go.',
    img: handSignsImg,
    alt: 'Person raising hand to hail a taxi',
  },
  {
    id: 3,
    title: 'Plan Your Route',
    desc: "Tell us where you're going and we'll suggest taxi options.",
    img: routeImg,
    alt: 'Person walking along a planned route with a pin destination',
  },
  {
    id: 4,
    title: 'Safety & Help',
    desc: 'Quick emergency contacts and safety tips when traveling.',
    img: safetyImg,
    alt: 'Person using safety features on a phone app',
  },
];

export default function OnboardingScreen({ goTo }) {
  const [active, setActive] = useState(0);

  const next = () => {
    if (active < SLIDES.length - 1) {
      setActive((p) => p + 1);
    } else {
      goTo(7); // last slide → go to HomeScreen
    }
  };

  const slide = SLIDES[active];

  return (
    <div className="onboard">
      {/* ── Hero blob + illustration ── */}
      <div className="onboard__hero">
        <BlobShape />
        <div className="onboard__illustration" key={active}>
          <img
            src={slide.img}
            alt={slide.alt}
            className="onboard__img"
          />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="onboard__body">
        <div className="onboard__text" key={`text-${active}`}>
          <h2 className="onboard__title">{slide.title}</h2>
          <p className="onboard__desc">{slide.desc}</p>
        </div>

        {/* ── Dots + arrow ── */}
        <div className="onboard__footer">
          <div className="onboard__dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`onboard__dot${i === active ? ' onboard__dot--active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="onboard__arrow" onClick={next} aria-label="Next">
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}

function BlobShape() {
  return (
    <svg
      className="onboard__blob"
      viewBox="0 0 390 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M0 0 H390 V300
           C370 340 340 380 290 390
           C240 400 200 370 160 360
           C110 348 60 370 20 350
           C-10 335 0 310 0 280 Z"
        fill="#1e6e2e"
      />
    </svg>
  );
}