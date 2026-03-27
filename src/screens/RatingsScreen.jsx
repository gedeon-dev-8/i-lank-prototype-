import { useState, useEffect } from 'react';
import '../styles/ratings.scss';
import RankReviewsScreen from './RankReviewsScreen';
import Mandla_Ndlovu_Img from '../assets/profiles/Mandla_Ndlovu.png';

// ─── Images loaded dynamically so a missing file never crashes the module ─────
// Vite will still bundle them, but a 404 shows a broken image rather than
// breaking the entire RatingsScreen module and making it silently invisible.
const IMG = {
    bosman: new URL('../assets/images/Bosman_TR.png', import.meta.url).href,
    TR066: new URL('../assets/taxi-ranks/TR_TR066.png', import.meta.url).href,
    TR139: new URL('../assets/taxi-ranks/TR_TR139.png', import.meta.url).href,
    TR067: new URL('../assets/taxi-ranks/TR_TR067.png', import.meta.url).href,
    TR101: new URL('../assets/taxi-ranks/TR_TR101.png', import.meta.url).href,
};

const RANKS = [
    { id: 1, name: 'Bosman Taxi Rank', address: '0126 Jeff Masemola St, Pretoria Central, Pretoria, 0002', rating: 4.1, count: '1.4K', image: IMG.bosman },
    { id: 2, name: 'Taxi Rank – TR066', address: 'Bloed St, Pretoria Central, Pretoria, 0002', rating: 3.8, count: '800', image: IMG.TR066 },
    { id: 3, name: 'Taxi Rank – TR139', address: 'Scheiding St, Pretoria Central, Pretoria, 0002', rating: 3.5, count: '246', image: IMG.TR139 },
    { id: 4, name: 'Taxi Rank – TR067', address: 'Dr Savage Rd, Prinshof 349-Jr, Pretoria, 0084', rating: 3.1, count: '233', image: IMG.TR067 },
    { id: 5, name: 'Taxi Rank – TR101', address: 'Lilian Ngoyi St, Pretoria Central, Pretoria, 0002', rating: 2.8, count: '12', image: IMG.TR101 },
];

const AREAS = ['Pretoria CBD', 'Centurion', 'Sunnyside', 'Hatfield', 'Mamelodi'];

function Stars({ rating }) {
    return (
        <div className="rs__stars">
            {[1, 2, 3, 4, 5].map((s) => {
                const filled = s <= Math.floor(rating);
                const half = !filled && s === Math.ceil(rating) && rating % 1 >= 0.25;
                return (
                    <i key={s}
                        className={`fas ${half ? 'fa-star-half-stroke' : 'fa-star'} rs__star${filled || half ? ' rs__star--filled' : ''}`}
                    />
                );
            })}
        </div>
    );
}

function RankCard({ rank, index, onClick }) {
    const [imgError, setImgError] = useState(false);
    return (
        <div className="rs__card" style={{ animationDelay: `${index * 60}ms` }} onClick={onClick}>
            <div className="rs__card-thumb">
                {!imgError ? (
                    <img src={rank.image} alt={rank.name} className="rs__card-img" onError={() => setImgError(true)} />
                ) : (
                    <div className="rs__card-img-fallback"><i className="fas fa-location-dot" /></div>
                )}
            </div>
            <div className="rs__card-info">
                <span className="rs__card-name">{rank.name}</span>
                <span className="rs__card-address">{rank.address}</span>
                <div className="rs__card-rating">
                    <Stars rating={rank.rating} />
                    <span className="rs__card-score">{rank.rating.toFixed(1)} ({rank.count})</span>
                </div>
            </div>
            <i className="fas fa-chevron-right" style={{ color: '#ccc', fontSize: 12, flexShrink: 0 }} />
        </div>
    );
}

export default function RatingsScreen({ onClose }) {
    const [visible, setVisible] = useState(false);
    const [showProTip, setShowProTip] = useState(true);
    const [area, setArea] = useState('Pretoria CBD');
    const [dropOpen, setDropOpen] = useState(false);
    const [selectedRankId, setSelectedRankId] = useState(null);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className={`rs${visible ? ' rs--in' : ''}`}>

            <div className="rs__status-cover" />

            <div className="rs__header">
                <button className="rs__close" onClick={onClose} aria-label="Close">
                    <i className="fas fa-times" />
                </button>
                <h1 className="rs__title">Commuter Ratings</h1>
                <div style={{ width: 32 }} />
            </div>

            <div className="rs__body">

                <div className="rs__area-row">
                    <div className="rs__area-selector" onClick={() => setDropOpen(o => !o)}>
                        <i className="fas fa-layer-group rs__area-icon" />
                        <span className="rs__area-label">Area:&nbsp;</span>
                        <span className="rs__area-value">{area}</span>
                        <i className={`fas fa-chevron-down rs__area-chevron${dropOpen ? ' rs__area-chevron--open' : ''}`} />
                    </div>
                    <div className="rs__avatar">
                        <img src={Mandla_Ndlovu_Img} alt="Mandla Ndlovu" className="rs__avatar-img" />
                    </div>
                </div>

                {dropOpen && (
                    <div className="rs__dropdown">
                        {AREAS.map(a => (
                            <button key={a}
                                className={`rs__dropdown-item${a === area ? ' rs__dropdown-item--active' : ''}`}
                                onClick={() => { setArea(a); setDropOpen(false); }}
                            >{a}</button>
                        ))}
                    </div>
                )}

                {showProTip && (
                    <div className="rs__protip">
                        <div className="rs__protip-icon"><i className="fas fa-lightbulb" /></div>
                        <div className="rs__protip-text">
                            <span className="rs__protip-label">Pro tip!</span>
                            <span className="rs__protip-desc">
                                This information comes from locals and recent commuters. Always follow your own judgement and stay aware of your surroundings.
                            </span>
                        </div>
                        <button className="rs__protip-close" onClick={() => setShowProTip(false)} aria-label="Dismiss">
                            <i className="fas fa-times" />
                        </button>
                    </div>
                )}

                <div className="rs__list">
                    {RANKS.map((rank, i) => (
                        <RankCard
                            key={rank.id}
                            rank={rank}
                            index={i}
                            onClick={() => setSelectedRankId(rank.id)}
                        />
                    ))}
                </div>

                <div style={{ height: 16 }} />
            </div>

            {selectedRankId !== null && (
                <RankReviewsScreen
                    rankId={selectedRankId}
                    onClose={() => setSelectedRankId(null)}
                />
            )}
        </div>
    );
}