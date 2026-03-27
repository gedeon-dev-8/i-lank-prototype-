import { useState, useEffect } from 'react';
import '../styles/guide.scss';

import { HandCBDIllustration, HandSandtonIllustration, HandRandburgIllustration, HandGermistonIllustration } from '../components/Illustrations';

const HAND_SIGNALS = [
    { id: 1, label: 'City Center (CBD)', sub: 'Point up diagonally', Hand: HandCBDIllustration },
    { id: 2, label: 'Joburg to Sandton', sub: 'Point down diagonally', Hand: HandSandtonIllustration },
    { id: 3, label: 'Randburg to Noord CBD', sub: 'Hand flat facing up', Hand: HandRandburgIllustration },
    { id: 4, label: 'Germiston to Katlehong', sub: 'Outward facing hand flat', Hand: HandGermistonIllustration },
];

const QUICK_TIPS = [
    { icon: 'fa-location-dot', color: '#2d6035', title: 'Find official ranks', desc: 'Use the map to locate verified taxi ranks with operating hours and routes.' },
    { icon: 'fa-share-nodes', color: '#2d6035', title: 'Share live trip', desc: 'Set up safety preferences to share your live location with trusted contacts.' },
    { icon: 'fa-hand', color: '#2d6035', title: 'Know the hand signals', desc: 'Common gestures for destinations like CBD, Soweto, Sandton are listed below.' },
];

const ETIQUETTE = [
    { icon: 'fa-volume-low', color: '#555', title: 'Communicate clearly', desc: 'Tell the driver your destination before boarding. Use local terms respectfully.' },
    { icon: 'fa-rotate-right', color: '#555', title: 'Check signage', desc: 'Look for route boards on the windscreen — ask rank marshals if unsure.' },
    { icon: 'fa-coins', color: '#555', title: 'Carry small change', desc: 'Pass your fare forward with both hands when seated at the back.' },
];

export default function GuideScreen({ onClose }) {
    const [visible, setVisible] = useState(false);
    const [showProTip, setShowProTip] = useState(true);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className={`guide${visible ? ' guide--in' : ''}`}>

            <div className="guide__status-cover" />

            <div className="guide__header">
                <button className="guide__close" onClick={onClose} aria-label="Close">
                    <i className="fas fa-times" />
                </button>
                <h1 className="guide__title">Commuter Guide</h1>
            </div>

            <div className="guide__body">

                <div className="guide__featured-card">
                    <div className="guide__featured-icon">
                        <i className="fas fa-book-open" />
                    </div>
                    <div className="guide__featured-info">
                        <span className="guide__featured-title">SA Taxi Rank Guide</span>
                        <span className="guide__featured-sub">Learn rank etiquette, safety and hand signals</span>
                    </div>
                    <div className="guide__offline-badge">
                        <i className="fas fa-arrow-down" /> Offline
                    </div>
                </div>

                <div className="guide__section">
                    <h2 className="guide__section-title">Quick tips</h2>
                    <div className="guide__tip-list">
                        {QUICK_TIPS.map((tip, i) => (
                            <div className="guide__tip-row" key={i}>
                                <div className="guide__tip-icon" style={{ color: tip.color }}>
                                    <i className={`fas ${tip.icon}`} />
                                </div>
                                <div className="guide__tip-text">
                                    <span className="guide__tip-title">{tip.title}</span>
                                    <span className="guide__tip-desc">{tip.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="guide__section">
                    <h2 className="guide__section-title">Popular hand signals</h2>
                    <div className="guide__signals-grid">
                        {HAND_SIGNALS.map((sig) => (
                            <div className="guide__signal-card" key={sig.id}>
                                <div className="guide__signal-thumb"><sig.Hand /></div>
                                <span className="guide__signal-label">{sig.label}</span>
                                <span className="guide__signal-sub">{sig.sub}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="guide__section">
                    <h2 className="guide__section-title">Etiquette &amp; safety</h2>
                    <div className="guide__tip-list">
                        {ETIQUETTE.map((item, i) => (
                            <div className="guide__tip-row" key={i}>
                                <div className="guide__tip-icon" style={{ color: item.color }}>
                                    <i className={`fas ${item.icon}`} />
                                </div>
                                <div className="guide__tip-text">
                                    <span className="guide__tip-title">{item.title}</span>
                                    <span className="guide__tip-desc">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {showProTip && (
                    <div className="guide__protip">
                        <div className="guide__protip-icon"><i className="fas fa-lightbulb" /></div>
                        <div className="guide__protip-text">
                            <span className="guide__protip-label">Pro tip!</span>
                            <span className="guide__protip-desc">
                                Always use your judgment and ask locals if signs differ in your area.
                            </span>
                        </div>
                        <button className="guide__protip-close" onClick={() => setShowProTip(false)} aria-label="Dismiss tip">
                            <i className="fas fa-times" />
                        </button>
                    </div>
                )}

                {/* Bottom padding so last item clears above the external nav bar */}
                <div style={{ height: 16 }} />
            </div>

        </div>
    );
}