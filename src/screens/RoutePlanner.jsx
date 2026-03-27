import { useState, useEffect, useRef } from 'react';
import RouteMapScreen from './RouteMapScreen';
import RankDetailScreen from './RankDetailScreen';
import '../styles/route-planner.scss';

const SUGGESTIONS = [
    { id: 1, name: 'Hatfield Plaza Shopping Centre', sub: 'Burnett Street, Hatfield, Pretoria, S...', km: '5.3 km' },
    { id: 2, name: '178 Francis Baard Street', sub: 'Pretoria Central, Tshwane', km: '<1 km' },
    { id: 3, name: 'Mercurius Complex – Sunny...', sub: '63 Johnston Street, Sunnyside, Pr...', km: '3.2 km' },
    { id: 4, name: '280 Flowers Street', sub: 'Hercules, Tshwane', km: '2.2 km' },
    { id: 5, name: 'Bounce Menlyn Maine', sub: 'Amarand Avenue, Waterkloof Glen...', km: '5.2 km' },
    { id: 6, name: 'Lynwood Mews', sub: "401 King's Highway, Lynnwood, Ts...", km: '7.6 km' },
];

const SEARCH_RESULTS = [
    { id: 1, name: 'Braamfontein', sub: 'Johannesburg, South Africa', km: '52.3 km' },
    { id: 2, name: 'Braamfontein Gate', sub: 'Smit Street, Braamfontein, Johan...', km: '52 km' },
    { id: 3, name: 'Braamfontein Werf', sub: 'Johannesburg, South Africa', km: '51.8 km' },
    { id: 4, name: 'Braamfontein Cemetery', sub: 'Graf Street, Johannesburg, South...', km: '52.4 km' },
    { id: 5, name: 'Braamfontein Recreation Cen...', sub: 'Harrison Street, Wanderers View...', km: '52 km' },
    { id: 6, name: 'Park Station', sub: '96 Rissik Street, Johannesburg', km: '52.2 km' },
];

const TAXI_RANKS = [
    { id: 1, name: 'Bosman Station Taxi...', walkLabel: 'Short Walk', km: '900 m', min: '4 min' },
    { id: 2, name: 'Belle Ombre Taxi Rank', walkLabel: 'Short Walk', km: '2.2 km', min: '8 min' },
    { id: 3, name: 'Bloed Street Mall Taxi...', walkLabel: 'Medium Walk', km: '3.4 km', min: '12 min' },
    { id: 4, name: 'Centurion Taxi Rank...', walkLabel: 'Long Walk', km: '13 km', min: '15 min' },
];

const WALK_COLOURS = {
    'Short Walk': { bg: '#e8f5e9', text: '#2d6035' },
    'Medium Walk': { bg: '#fff8e1', text: '#b45309' },
    'Long Walk': { bg: '#fce8e8', text: '#b91c1c' },
};

export default function RoutePlanner({ onClose }) {
    // ── Sub-screen stack: null | { screen: 'map'|'detail', rankId }
    const [subScreen, setSubScreen] = useState(null);

    const [phase, setPhase] = useState('search');
    const [visible, setVisible] = useState(false);
    const [locationVal, setLocationVal] = useState('2 Bloem Street');
    const [destVal, setDestVal] = useState('');
    const [locationFocused, setLocationFocused] = useState(false);
    const [destFocused, setDestFocused] = useState(false);
    const [selectedRank, setSelectedRank] = useState(1);
    const destRef = useRef(null);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        if (visible && phase === 'search') {
            const t = setTimeout(() => destRef.current?.focus(), 320);
            return () => clearTimeout(t);
        }
    }, [visible, phase]);

    useEffect(() => {
        if (locationVal.trim() && destVal.trim()) {
            const t = setTimeout(() => setPhase('results'), 400);
            return () => clearTimeout(t);
        }
    }, [locationVal, destVal]);

    const handleSwap = () => {
        setLocationVal(destVal);
        setDestVal(locationVal);
    };

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 340);
    };

    const handleBackToSearch = () => {
        setPhase('search');
        setDestVal('');
    };

    // ── Start route → show map screen
    const handleStartRoute = () => {
        setSubScreen({ screen: 'map', rankId: selectedRank });
    };

    // ── "Taxi Rank Info" on card → show detail screen
    const handleViewDetail = (rankId) => {
        setSubScreen({ screen: 'detail', rankId });
    };

    // ── Back from sub-screens
    const handleSubClose = () => setSubScreen(null);

    const results = destVal.length > 0 ? SEARCH_RESULTS : SUGGESTIONS;

    return (
        <div className={`rp-overlay${visible ? ' rp-overlay--in' : ''}`}>

            {/* ══ Search phase ═══════════════════════════════════════════════════ */}
            {phase === 'search' && !subScreen && (
                <div className={`rp${visible ? ' rp--in' : ''}`}>
                    <div className="rp__header">
                        <button className="rp__close" onClick={handleClose} aria-label="Close">
                            <i className="fas fa-times" />
                        </button>
                        <h2 className="rp__title">Route Planner</h2>
                    </div>

                    <div className="rp__inputs">
                        <div className={`rp__field${locationFocused ? ' rp__field--active' : ''}`}>
                            <i className="fas fa-location-crosshairs rp__field-icon" />
                            <input
                                className="rp__input"
                                type="text"
                                placeholder="Current Location"
                                value={locationVal}
                                onChange={(e) => setLocationVal(e.target.value)}
                                onFocus={() => setLocationFocused(true)}
                                onBlur={() => setLocationFocused(false)}
                            />
                            <button className="rp__field-action" aria-label="Pick on map">
                                <i className="fas fa-street-view" />
                            </button>
                        </div>

                        <div className={`rp__field${destFocused ? ' rp__field--active' : ''}`}>
                            <i className="fas fa-location-dot rp__field-icon" />
                            <input
                                ref={destRef}
                                className="rp__input"
                                type="text"
                                placeholder="Destinations"
                                value={destVal}
                                onChange={(e) => setDestVal(e.target.value)}
                                onFocus={() => setDestFocused(true)}
                                onBlur={() => setDestFocused(false)}
                            />
                            <button className="rp__field-action" onClick={handleSwap} aria-label="Swap">
                                <i className="fas fa-arrow-right-arrow-left rp__swap-icon" />
                            </button>
                        </div>
                    </div>

                    <div className="rp__divider" />

                    <div className="rp__list">
                        {results.map((item, i) => (
                            <button
                                key={item.id}
                                className="rp__result"
                                style={{ animationDelay: `${i * 40 + 180}ms` }}
                                onClick={() => {
                                    if (!locationVal.trim()) setLocationVal('2 Bloem Street');
                                    setDestVal(item.name);
                                }}
                            >
                                <div className="rp__result-icon">
                                    <i className="fas fa-location-dot" />
                                </div>
                                <div className="rp__result-info">
                                    <span className="rp__result-name">{item.name}</span>
                                    <span className="rp__result-sub">{item.sub}</span>
                                </div>
                                <span className="rp__result-km">{item.km}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ══ Results phase ══════════════════════════════════════════════════ */}
            {phase === 'results' && !subScreen && (
                <RouteResults
                    from={locationVal}
                    to={destVal}
                    selectedRank={selectedRank}
                    onSelectRank={setSelectedRank}
                    onBack={handleBackToSearch}
                    onClose={handleClose}
                    onStartRoute={handleStartRoute}
                />
            )}

            {/* ══ Map sub-screen ══════════════════════════════════════════════════ */}
            {subScreen?.screen === 'map' && (
                <RouteMapScreen
                    rankId={subScreen.rankId}
                    from={locationVal || '2 Bloem Street'}
                    to={destVal || 'Braamfontein...'}
                    onViewDetail={handleViewDetail}
                    onClose={handleSubClose}
                />
            )}

            {/* ══ Detail sub-screen ═══════════════════════════════════════════════ */}
            {subScreen?.screen === 'detail' && (
                <RankDetailScreen
                    rankId={subScreen.rankId}
                    onClose={() => setSubScreen({ screen: 'map', rankId: subScreen.rankId })}
                />
            )}

        </div>
    );
}

// ─── Route results panel (phase 2) ───────────────────────────────────────────
function RouteResults({ from, to, selectedRank, onSelectRank, onBack, onClose, onStartRoute }) {
    const [sheetVisible, setSheetVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setSheetVisible(true), 150);
        return () => clearTimeout(t);
    }, []);

    const truncate = (s, n) => s.length > n ? s.slice(0, n) + '…' : s;

    return (
        <div className="rr">
            <div className="rr__map">
                <iframe
                    className="rr__map-frame"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=28.1820%2C-25.7460%2C28.2020%2C-25.7340&layer=mapnik"
                    title="Route map"
                    scrolling="no"
                />
                <svg className="rr__route-line" viewBox="0 0 366 320" preserveAspectRatio="none">
                    <path
                        d="M80 280 C100 220 140 180 183 160 C220 140 260 120 290 80"
                        stroke="#2d6035" strokeWidth="5" strokeLinecap="round"
                        strokeDasharray="12 6" fill="none" opacity="0.85"
                    />
                </svg>
            </div>

            <div className="rr__topbar">
                <button className="rr__topbar-close" onClick={onClose} aria-label="Close">
                    <i className="fas fa-times" />
                </button>
                <div className="rr__topbar-route">
                    <span className="rr__topbar-loc">{truncate(from, 14)}</span>
                    <i className="fas fa-arrow-right rr__topbar-arrow" />
                    <span className="rr__topbar-loc">{truncate(to, 14)}</span>
                </div>
                <button className="rr__topbar-edit" onClick={onBack} aria-label="Edit">
                    <i className="fas fa-pen-to-square" />
                </button>
            </div>

            <div className={`rr__sheet${sheetVisible ? ' rr__sheet--in' : ''}`}>
                <div className="rr__sheet-handle" />

                <div className="rr__ranks">
                    {TAXI_RANKS.map((rank, i) => {
                        const wc = WALK_COLOURS[rank.walkLabel];
                        const isSelected = selectedRank === rank.id;
                        return (
                            <button
                                key={rank.id}
                                className={`rr__rank${isSelected ? ' rr__rank--selected' : ''}`}
                                style={{ animationDelay: `${i * 60 + 80}ms` }}
                                onClick={() => onSelectRank(rank.id)}
                            >
                                <div className="rr__rank-thumb">
                                    <i className="fas fa-location-dot rr__rank-pin" />
                                </div>
                                <div className="rr__rank-info">
                                    <span className="rr__rank-name">{rank.name}</span>
                                    <span className="rr__rank-badge" style={{ background: wc.bg, color: wc.text }}>
                                        {rank.walkLabel}
                                    </span>
                                </div>
                                <div className="rr__rank-meta">
                                    <span className="rr__rank-km">{rank.km}</span>
                                    <span className="rr__rank-min">{rank.min}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <button className="rr__cta" onClick={onStartRoute}>
                    Start route to this rank
                </button>
            </div>
        </div>
    );
}