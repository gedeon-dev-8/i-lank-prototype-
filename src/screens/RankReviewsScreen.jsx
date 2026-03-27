import { useState, useEffect, useRef } from 'react';
import '../styles/rank-reviews.scss';
import Mandla_Ndlovu from '../assets/profiles/Mandla_Ndlovu.png';

// ─── Profile image imports ────────────────────────────────────────────────────
import Thando_Mokoena_Img from '../assets/profiles/Thando_Mokoena.png';
import Sipho_Khumalo_Img from '../assets/profiles/Sipho_Khumalo.png';
import Siyabonga_Sithole_Img from '../assets/profiles/Siyabonga_Sithole.png';

// ─── Map reviewer names → imported images ────────────────────────────────────
// Any name not listed here falls back to the coloured initials circle.
const PROFILE_IMAGES = {
    'Thando Mokoena': Thando_Mokoena_Img,
    'Sipho Khumalo': Sipho_Khumalo_Img,
    'Siyabonga Sithole': Siyabonga_Sithole_Img,
};

// ─── Review data ──────────────────────────────────────────────────────────────
const REVIEWS_DATA = {
    1: {
        name: 'Bosman Taxi Rank',
        totalReviews: 1773,
        rating: 4.1,
        breakdown: [55, 25, 10, 6, 4],
        reviews: [
            { id: 1, name: 'Thando Mokoena', ago: '7 days ago', stars: 3, avatar: '#e0b090', initials: 'TM', text: "It's a decent taxi rank, but I've had a few issues with drivers refusing short trips. When they do accept, the service is fine, but consistency could be better." },
            { id: 2, name: 'Sipho Khumalo', ago: '13 days ago', stars: 2, avatar: '#90a0b0', initials: 'SK', text: "Not the best experience—long wait times and some drivers were rude. The rank could use better organization and more taxis during busy periods." },
            { id: 3, name: 'Siyabonga Sithole', ago: '25 days ago', stars: 5, avatar: '#90b0a0', initials: 'SS', text: "I use this taxi rank regularly, and the taxis are always available, even during peak hours. The drivers are professional, and the fares are fair. Highly recommend!" },
        ],
    },
    2: {
        name: 'Taxi Rank – TR066',
        totalReviews: 2706,
        rating: 3.8,
        breakdown: [42, 28, 18, 8, 4],
        reviews: [
            { id: 1, name: 'Nolwazi Khumalo', ago: 'A day ago', stars: 4, avatar: '#b090e0', initials: 'NK', text: "Most of the time, this taxi rank is efficient, but during rush hour, you might wait a bit longer. Still, the drivers are friendly and the vehicles are clean." },
            { id: 2, name: 'Thando Mokoena', ago: '7 days ago', stars: 3, avatar: '#e0b090', initials: 'TM', text: "It's a decent taxi rank, but I've had a few issues with drivers refusing short trips. When they do accept, the service is fine, but consistency could be better." },
            { id: 3, name: 'Sipho Khumalo', ago: '13 days ago', stars: 2, avatar: '#90a0b0', initials: 'SK', text: "Not the best experience—long wait times and some drivers were rude. The rank could use better organization and more taxis during busy periods." },
            { id: 4, name: 'Siyabonga Sithole', ago: '25 days ago', stars: 5, avatar: '#90b0a0', initials: 'SS', text: "I use the TR066 taxi rank regularly, and the taxis are always available, even during peak hours. The drivers are professional, and the fares are fair. Highly recommend this rank!" },
        ],
    },
    3: {
        name: 'Taxi Rank – TR139',
        totalReviews: 246,
        rating: 3.5,
        breakdown: [35, 30, 20, 10, 5],
        reviews: [
            { id: 1, name: 'Lerato Dlamini', ago: '2 days ago', stars: 4, avatar: '#c090b0', initials: 'LD', text: "Generally a good experience. The rank is well organised and staff are helpful. Could do with more shelter during rain though." },
            { id: 2, name: 'Sipho Khumalo', ago: '10 days ago', stars: 2, avatar: '#90a0b0', initials: 'SK', text: "Long queues and unpredictable departure times. Not ideal if you have somewhere important to be." },
        ],
    },
    4: {
        name: 'Taxi Rank – TR067',
        totalReviews: 233,
        rating: 3.1,
        breakdown: [30, 25, 20, 15, 10],
        reviews: [
            { id: 1, name: 'Nomsa Zulu', ago: '3 days ago', stars: 3, avatar: '#d0a090', initials: 'NZ', text: "Average experience. The rank is functional but could be cleaner and better managed during peak hours." },
            { id: 2, name: 'Bongani Nkosi', ago: '20 days ago', stars: 2, avatar: '#a0b0c0', initials: 'BN', text: "Frustrating waits and some drivers were not cooperative. Needs improvement in organisation." },
        ],
    },
    5: {
        name: 'Taxi Rank – TR101',
        totalReviews: 12,
        rating: 2.8,
        breakdown: [25, 20, 15, 25, 15],
        reviews: [
            { id: 1, name: 'Thabo Sithole', ago: '5 days ago', stars: 3, avatar: '#b0c0a0', initials: 'TS', text: "Small rank, limited taxis. Decent for off-peak travel but avoid rush hour." },
        ],
    },
};

// ─── Star display / picker ────────────────────────────────────────────────────
function Stars({ count, size = 14, interactive = false, onRate }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="rvw__stars">
            {[1, 2, 3, 4, 5].map((s) => {
                const filled = interactive ? (hovered || count) >= s : count >= s;
                return (
                    <i
                        key={s}
                        className={`fas fa-star rvw__star${filled ? ' rvw__star--filled' : ''}`}
                        style={{ fontSize: size }}
                        onMouseEnter={() => interactive && setHovered(s)}
                        onMouseLeave={() => interactive && setHovered(0)}
                        onClick={() => interactive && onRate?.(s)}
                    />
                );
            })}
        </div>
    );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
// Uses a real profile photo when available, falls back to coloured initials.
function Avatar({ name, initials, color, size = 40, imgSrc }) {
    const [imgErr, setImgErr] = useState(false);

    // Resolve: explicit imgSrc prop > PROFILE_IMAGES lookup by name > fallback
    const resolvedImg = imgSrc || PROFILE_IMAGES[name] || null;
    const showImg = resolvedImg && !imgErr;

    return (
        <div
            className="rvw__avatar"
            style={{
                width: size,
                height: size,
                background: showImg ? 'transparent' : color,
                fontSize: size * 0.35,
                overflow: 'hidden',
            }}
        >
            {showImg ? (
                <img
                    src={resolvedImg}
                    alt={name || initials}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={() => setImgErr(true)}
                />
            ) : (
                initials
            )}
        </div>
    );
}

// ─── Rating summary ───────────────────────────────────────────────────────────
function RatingSummary({ data }) {
    const max = Math.max(...data.breakdown);
    return (
        <div className="rvw__summary">
            <div className="rvw__summary-score">
                <span className="rvw__big-num">{data.rating.toFixed(1)}</span>
                <span className="rvw__out-of">out of 5</span>
            </div>
            <div className="rvw__bars">
                {data.breakdown.map((pct, i) => (
                    <div className="rvw__bar-row" key={i}>
                        {[1, 2, 3, 4, 5].map(s => (
                            <i key={s} className={`fas fa-star rvw__bar-star${s <= (5 - i) ? ' rvw__bar-star--filled' : ''}`} />
                        ))}
                        <div className="rvw__bar-track">
                            <div className="rvw__bar-fill" style={{ width: `${(pct / max) * 100}%` }} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="rvw__count-col">
                <span className="rvw__ratings-count">{data.totalReviews.toLocaleString()} Ratings</span>
            </div>
        </div>
    );
}

// ─── Review card ──────────────────────────────────────────────────────────────
function ReviewCard({ review }) {
    return (
        <div className="rvw__card">
            <div className="rvw__card-top">
                {/* Avatar looks up the profile image by reviewer name automatically */}
                <Avatar
                    name={review.name}
                    initials={review.initials}
                    color={review.avatar}
                    size={42}
                />
                <div className="rvw__card-meta">
                    <span className="rvw__card-name">{review.name}</span>
                    <span className="rvw__card-ago">{review.ago}</span>
                </div>
                <Stars count={review.stars} size={13} />
            </div>
            <p className="rvw__card-text">{review.text}</p>
        </div>
    );
}

// ─── Rate form ────────────────────────────────────────────────────────────────
function RateForm({ rankName, onClose, onSubmit }) {
    const [stars, setStars] = useState(0);
    const [text, setText] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (stars === 0) return;
        setSubmitted(true);
        setTimeout(() => {
            onSubmit({ stars, text });
            onClose();
        }, 800);
    };

    return (
        <div className="rvw__form">
            <div className="rvw__form-avatar">
                {/* Current user avatar — uses initials fallback */}
                {/* <Avatar initials="G" color="#4a4a8a" size={72} /> */}
                <img src={Mandla_Ndlovu} alt="Mandla Ndlovu" className="rvw__form-avatar-img" />
            </div>

            <p className="rvw__form-question">
                How would you rate your experience at the{' '}
                <strong>{rankName}</strong> taxi rank?
            </p>

            <div className="rvw__form-stars">
                <Stars count={stars} size={40} interactive onRate={setStars} />
            </div>

            <textarea
                className="rvw__form-textarea"
                placeholder="What was your experience like at this taxi rank?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
            />

            <button
                className={`rvw__form-submit${submitted ? ' rvw__form-submit--done' : ''}`}
                onClick={handleSubmit}
                disabled={stars === 0}
            >
                {submitted ? 'Thank you! ✓' : 'Submit'}
            </button>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function RankReviewsScreen({ rankId, onClose }) {
    const data = REVIEWS_DATA[rankId] || REVIEWS_DATA[2];
    const [visible, setVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [localReviews, setLocalReviews] = useState(data.reviews);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const handleNewReview = ({ stars, text }) => {
        if (!text.trim()) return;
        setLocalReviews(prev => [{
            id: Date.now(),
            name: 'You',
            ago: 'Just now',
            stars,
            avatar: '#4a4a8a',
            initials: 'G',
            text,
        }, ...prev]);
    };

    return (
        <div className={`rvw${visible ? ' rvw--in' : ''}`}>

            <div className="rvw__status-cover" />

            <div className="rvw__header">
                <button className="rvw__back" onClick={onClose} aria-label="Back">
                    <i className="fas fa-chevron-left" />
                </button>
                <h1 className="rvw__title">{data.name}</h1>
            </div>

            {!showForm && (
                <div className="rvw__body">
                    <h2 className="rvw__reviews-heading">
                        {data.totalReviews.toLocaleString()} Reviews
                    </h2>
                    <RatingSummary data={data} />
                    <div className="rvw__list">
                        {localReviews.map((r) => (
                            <ReviewCard key={r.id} review={r} />
                        ))}
                    </div>
                    <div style={{ height: 100 }} />
                </div>
            )}

            {showForm && (
                <div className="rvw__body rvw__body--form">
                    <RateForm
                        rankName={data.name}
                        onClose={() => setShowForm(false)}
                        onSubmit={handleNewReview}
                    />
                </div>
            )}

            {!showForm && (
                <div className="rvw__footer">
                    <button className="rvw__footer-btn" onClick={() => setShowForm(true)}>
                        Rate &amp; Review
                    </button>
                </div>
            )}
        </div>
    );
}