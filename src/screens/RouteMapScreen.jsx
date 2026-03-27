import { useState, useEffect } from 'react';
import { RANKS } from '../data/rankData';
import '../styles/route-map.scss';

const WALK_COLOURS = {
    'Short Walk': { bg: '#e8f5e9', text: '#2d6035' },
    'Medium Walk': { bg: '#fff8e1', text: '#b45309' },
    'Long Walk': { bg: '#fce8e8', text: '#b91c1c' },
};

export default function RouteMapScreen({ rankId, from, to, onViewDetail, onClose }) {
    const rank = RANKS.find((r) => r.id === rankId) || RANKS[0];

    /**
     * Sheet visibility is independent from the content phase:
     *
     *  0ms      → sheet hidden (translateY 100%)
     *  400ms    → sheet slides up showing ONLY the loader
     *  2600ms   → content phase switches to 'card'
     *  2700ms   → card animates in
     */
    const [sheetVisible, setSheetVisible] = useState(false); // controls slide-up
    const [phase, setPhase] = useState('loading'); // 'loading' | 'card'
    const [cardVisible, setCardVisible] = useState(false);     // card entrance anim
    const [imgError, setImgError] = useState(false);     // image fallback

    useEffect(() => {
        // Reset state whenever the rank changes (user picks a different rank)
        setSheetVisible(false);
        setPhase('loading');
        setCardVisible(false);
        setImgError(false);

        const t1 = setTimeout(() => setSheetVisible(true), 400);   // sheet slides up
        const t2 = setTimeout(() => setPhase('card'), 2300);  // swap loader → card → initVal → 2600
        const t3 = setTimeout(() => setCardVisible(true), 2700);  // card entrance

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [rankId]);

    const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${rank.mapBbox}&layer=mapnik`;

    return (
        <div className="rmap">
            {/* ── Full-bleed map ── */}
            <div className="rmap__map">
                <iframe
                    className="rmap__frame"
                    src={mapSrc}
                    title={`Route to ${rank.name}`}
                />
                {/* Route line overlay */}
                <svg className="rmap__route" viewBox="0 0 366 560" preserveAspectRatio="none">
                    <path
                        d="M183 500 C160 420 130 350 120 280 C110 210 130 160 160 110 C180 80 210 60 230 40"
                        stroke="#1565C0"
                        strokeWidth="5"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.85"
                    />
                </svg>
            </div>

            {/* ── Top bar ── */}
            <div className="rmap__topbar">
                <button className="rmap__topbar-close" onClick={onClose} aria-label="Close">
                    <i className="fas fa-times" />
                </button>
                <div className="rmap__topbar-route">
                    <span className="rmap__topbar-loc">{from || '2 Bloem Street'}</span>
                    <i className="fas fa-arrow-right rmap__topbar-arrow" />
                    <span className="rmap__topbar-loc">{to || 'Braamfontein...'}</span>
                </div>
                <button className="rmap__topbar-edit" aria-label="Edit">
                    <i className="fas fa-pen-to-square" />
                </button>
            </div>

            {/* ── ETA badge ── */}
            <div className="rmap__badge">
                <span className="rmap__badge-time">{rank.min}</span>
                <span className="rmap__badge-tag rmap__badge-tag--green">No delay</span>
            </div>

            {/* ── Bottom sheet ── */}
            <div className={`rmap__sheet${sheetVisible ? ' rmap__sheet--in' : ''}`}>
                <div className="rmap__sheet-handle" />

                <button className="rmap__sheet-dismiss" onClick={onClose} aria-label="Dismiss">
                    <i className="fas fa-times" />
                </button>

                {/* ── Loader (shown until phase switches to 'card') ── */}
                {phase === 'loading' && (
                    <div className="rmap__loading">
                        <div className="rmap__spinner" />
                        <p className="rmap__loading-text">Loading information...</p>
                    </div>
                )}

                {/* ── Rank info card ── */}
                {phase === 'card' && (
                    <div className={`rmap__card${cardVisible ? ' rmap__card--in' : ''}`}>

                        {/* ── Thumbnail: image covers entire area ── */}
                        <div className="rmap__card-thumb">
                            {!imgError ? (
                                <img
                                    src={rank.image}
                                    alt={rank.name}
                                    className="rmap__card-thumb-img"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                /* Fallback only shown when image fails to load */
                                <div className="rmap__card-thumb-fallback">
                                    <i className="fas fa-location-dot" />
                                </div>
                            )}
                        </div>

                        {/* ── Info ── */}
                        <div className="rmap__card-info">
                            <span className="rmap__card-name">{rank.name}</span>
                            <span className="rmap__card-address">
                                <i className="fas fa-location-dot" /> {rank.address}
                            </span>
                            <button
                                className="rmap__card-cta"
                                onClick={() => onViewDetail(rank.id)}
                            >
                                Taxi Rank Info
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}