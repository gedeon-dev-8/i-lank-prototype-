import { useState } from 'react';
import '../styles/home.scss';

import RoutePlanner from './RoutePlanner';
import GuideScreen from './GuideScreen';
import RatingsScreen from './RatingsScreen';
import SignsScreen from './SignsScreen';
import ProfileScreen from './ProfileScreen';
import { PersonPinIllustration } from '../components/Illustrations';

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { id: 'home', icon: 'fa-house', label: 'Home' },
    { id: 'signs', icon: 'fa-hand', label: 'Signs' },
    { id: 'search', fab: true },
    { id: 'guide', icon: 'fa-book-open', label: 'Guide' },
    { id: 'ratings', icon: 'fa-star', label: 'Ratings' },
];

function BottomNav({ active, onSelect }) {
    return (
        <div className="home-nav">
            {NAV_ITEMS.map((item) =>
                item.fab ? (
                    <button
                        key="search"
                        className="home-nav__fab"
                        onClick={() => onSelect('search')}
                        aria-label="Search"
                    >
                        <i className="fas fa-magnifying-glass" />
                    </button>
                ) : (
                    <button
                        key={item.id}
                        className={`home-nav__item${active === item.id ? ' home-nav__item--active' : ''}`}
                        onClick={() => onSelect(item.id)}
                        aria-label={item.label}
                    >
                        <i className={`fas ${item.icon}`} />
                        <span>{item.label}</span>
                    </button>
                )
            )}
        </div>
    );
}

function MapBackground({ dimmed }) {
    return (
        <div className={`home-map${dimmed ? ' home-map--dimmed' : ''}`}>
            <iframe
                className="home-map__frame"
                src="https://www.openstreetmap.org/export/embed.html?bbox=28.1800%2C-25.7500%2C28.2100%2C-25.7300&layer=mapnik"
                title="Pretoria CBD map"
            />
        </div>
    );
}

function LocationSheet({ onAllow, onSkip }) {
    return (
        <div className="home-sheet">
            <div className="home-sheet__handle" />
            <button className="home-sheet__close" onClick={onSkip} aria-label="Close">
                <i className="fas fa-times" />
            </button>
            <div className="home-sheet__illustration">
                <PersonPinIllustration />
            </div>
            <h2 className="home-sheet__title">Allow location access</h2>
            <p className="home-sheet__desc">
                We need your location to find available nearby taxi ranks
            </p>
            <button className="home-sheet__allow" onClick={onAllow}>
                Allow location access
            </button>
            <button className="home-sheet__skip" onClick={onSkip}>
                Maybe later
            </button>
        </div>
    );
}

function AddressTooltip() {
    return (
        <div className="home-tooltip">
            <i className="fas fa-location-dot home-tooltip__icon" />
            <div>
                <div className="home-tooltip__street">2 Bloem Street, Pretoria</div>
                <div className="home-tooltip__suburb">Suburbs, Pretoria, 0002</div>
            </div>
        </div>
    );
}

// ─── Menu button — now wired to open ProfileScreen ────────────────────────────
function MapMenuBtn({ onClick }) {
    return (
        <button className="home-menu-btn" aria-label="Menu" onClick={onClick}>
            <i className="fas fa-bars" />
        </button>
    );
}

// ─── Overlay wrapper ──────────────────────────────────────────────────────────
const NAV_H = 72;

function Overlay({ zIndex = 35, children }) {
    return (
        <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            bottom: NAV_H,
            zIndex,
            borderRadius: '42px 42px 0 0',
            overflow: 'hidden',
            backgroundColor: '#fff',
        }}>
            {children}
        </div>
    );
}

// ─── HomeScreen ───────────────────────────────────────────────────────────────
export default function HomeScreen({ goTo }) {
    const [phase, setPhase] = useState('permission');
    const [activeNav, setActiveNav] = useState('home');
    const [showPlanner, setShowPlanner] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [showRatings, setShowRatings] = useState(false);
    const [showSigns, setShowSigns] = useState(false);
    const [showProfile, setShowProfile] = useState(false);  // ← new

    function handleNavSelect(id) {
        if (id === 'search') { setShowPlanner(true); return; }
        setActiveNav(id);
        setShowGuide(false);
        setShowRatings(false);
        setShowSigns(false);
        if (id === 'guide') setShowGuide(true);
        if (id === 'ratings') setShowRatings(true);
        if (id === 'signs') setShowSigns(true);
    }

    const mapPhase = phase === 'map';

    return (
        <div className="home">

            <MapBackground dimmed={phase === 'permission'} />

            {phase === 'permission' && (
                <LocationSheet
                    onAllow={() => setPhase('map')}
                    onSkip={() => setPhase('map')}
                />
            )}

            {mapPhase && !showGuide && !showRatings && !showPlanner && !showSigns && (
                <div className="home-mapui home-mapui--enter">
                    {/* ← onClick wired here */}
                    <MapMenuBtn onClick={() => setShowProfile(true)} />
                    <AddressTooltip />
                </div>
            )}

            {/* Route Planner — full screen, covers nav */}
            {showPlanner && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 40,
                    borderRadius: 'inherit', overflow: 'hidden',
                }}>
                    <RoutePlanner onClose={() => setShowPlanner(false)} />
                </div>
            )}

            {/* Signs */}
            {showSigns && (
                <Overlay zIndex={35}>
                    <SignsScreen onClose={() => { setShowSigns(false); setActiveNav('home'); }} />
                </Overlay>
            )}

            {/* Guide */}
            {showGuide && (
                <Overlay zIndex={35}>
                    <GuideScreen onClose={() => { setShowGuide(false); setActiveNav('home'); }} />
                </Overlay>
            )}

            {/* Ratings */}
            {showRatings && (
                <Overlay zIndex={35}>
                    <RatingsScreen onClose={() => { setShowRatings(false); setActiveNav('home'); }} />
                </Overlay>
            )}

            {/* Bottom nav */}
            {mapPhase && (
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    zIndex: 36,
                    backgroundColor: '#ffffff',
                    borderTop: '1px solid #f0f0f0',
                }}>
                    <BottomNav active={activeNav} onSelect={handleNavSelect} />
                </div>
            )}

            {/*
                Profile — rendered OUTSIDE the Overlay wrapper so it covers
                the full phone-inner including the nav bar (z-index: 50).
                The close button slides it back out.
            */}
            {showProfile && (
                <ProfileScreen onClose={() => setShowProfile(false)} />
            )}

        </div>
    );
}