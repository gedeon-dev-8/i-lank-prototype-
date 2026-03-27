import { useState, useEffect } from 'react';
import { RANKS } from '../data/rankData';
import GuideScreen from './GuideScreen';
import RatingsScreen from './RatingsScreen';
import '../styles/rank-detail.scss';

export default function RankDetailScreen({ rankId, onClose }) {
    const rank = RANKS.find((r) => r.id === rankId) || RANKS[0];
    const [visible, setVisible] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [showRatings, setShowRatings] = useState(false);

    useEffect(() => {
        setImgError(false);
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, [rankId]);

    const maxBreakdown = Math.max(...rank.breakdown);

    return (
        <div className={`rd${visible ? ' rd--in' : ''}`}>

            {/* ── Status bar cover ── */}
            <div className="rd__status-cover" />

            {/* ── App bar ── */}
            <div className="rd__appbar">
                <button className="rd__appbar-close" onClick={onClose} aria-label="Close">
                    <i className="fas fa-times" />
                </button>
                <h1 className="rd__appbar-title">{rank.name}</h1>
            </div>

            {/* ── Scrollable body ── */}
            <div className="rd__body">

                {/* Photo */}
                <div className="rd__photo">
                    {!imgError ? (
                        <img
                            src={rank.image}
                            alt={rank.name}
                            className="rd__photo-img"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="rd__photo-fallback">
                            <i className="fas fa-location-dot" />
                        </div>
                    )}
                </div>

                {/* Meta chips */}
                <div className="rd__chips">
                    <div className="rd__chip">
                        <i className="fas fa-clock rd__chip-icon" />
                        <span>{rank.hours}</span>
                    </div>
                    <div className="rd__chip">
                        <i className="fas fa-users rd__chip-icon" />
                        <span>{rank.audience}</span>
                    </div>
                </div>

                {/* Safety & tips */}
                <div className="rd__section">
                    <h3 className="rd__section-title">Safety &amp; tips</h3>
                    <div className="rd__tips">
                        {rank.safetyTips.map((tip, i) => (
                            <div className="rd__tip" key={i}>
                                <div className={`rd__tip-icon rd__tip-icon--${i}`}>
                                    <i className={`fas ${tip.icon}`} />
                                </div>
                                <p className="rd__tip-text">{tip.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rank rating */}
                <div className="rd__section">
                    <h3 className="rd__section-title">Rank rating</h3>
                    <div className="rd__rating">
                        <div className="rd__rating-score">
                            <span className="rd__rating-num">{rank.rating.toFixed(1)}</span>
                            <span className="rd__rating-outof">out of 5</span>
                        </div>
                        <div className="rd__rating-bars">
                            {rank.breakdown.map((pct, i) => (
                                <div className="rd__bar-row" key={i}>
                                    <i className="fas fa-star rd__bar-star" />
                                    <div className="rd__bar-track">
                                        <div
                                            className="rd__bar-fill"
                                            style={{ width: `${(pct / maxBreakdown) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rd__rating-summary">
                            <div className="rd__stars">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <i
                                        key={s}
                                        className={`fas fa-star rd__star${s <= Math.round(rank.rating) ? ' rd__star--filled' : ''}`}
                                    />
                                ))}
                            </div>
                            <span className="rd__rating-count">
                                {rank.ratingCount.toLocaleString()} Ratings
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ height: 24 }} />
            </div>

            {/* ── Footer ── */}
            <div className="rd__footer">
                {/* Rate & Review → opens RatingsScreen */}
                <button
                    className="rd__btn rd__btn--primary"
                    onClick={() => setShowRatings(true)}
                >
                    <i className="fas fa-star" /> Rate &amp; Review
                </button>

                {/* Guide → opens GuideScreen */}
                <button
                    className="rd__btn rd__btn--outline"
                    onClick={() => setShowGuide(true)}
                >
                    <i className="fas fa-book-open" /> Guide
                </button>
            </div>

            {/* ── Overlays ── */}
            {showGuide && (
                <GuideScreen onClose={() => setShowGuide(false)} />
            )}
            {showRatings && (
                <RatingsScreen onClose={() => setShowRatings(false)} />
            )}

        </div>
    );
}