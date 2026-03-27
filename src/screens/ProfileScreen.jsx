import { useState, useEffect } from 'react';
import '../styles/profile.scss';
import LanguageScreen from './LanguageScreen';

import Mandla_Ndlovu_Img from '../assets/profiles/Mandla_Ndlovu.png';

// ─── Settings data ────────────────────────────────────────────────────────────
const SECTIONS = [
    {
        title: 'Account',
        items: [
            { id: 'safety', icon: 'fa-shield-halved', label: 'Safety Preferences', sub: 'Share live location, trusted contacts', type: 'arrow' },
        ],
    },
    {
        title: 'Experience',
        items: [
            { id: 'language', icon: 'fa-earth-africa', label: 'Language', sub: 'Select your preferred languages', type: 'arrow', action: 'language' },
            { id: 'notifications', icon: 'fa-bell', label: 'Notifications', sub: 'Service alerts, rank updates', type: 'toggle', defaultOn: true },
            { id: 'area', icon: 'fa-location-dot', label: 'Default area', sub: 'Used for suggestions and ratings', type: 'arrow' },
        ],
    },
    {
        title: 'Privacy',
        items: [
            { id: 'anon', icon: 'fa-eye-slash', label: 'Anonymous reviews', sub: 'Post ratings without your name', type: 'toggle', defaultOn: false },
            { id: 'data', icon: 'fa-lock', label: 'Data and permissions', sub: 'Location, camera, storage', type: 'arrow' },
        ],
    },
    {
        title: 'Support',
        items: [
            { id: 'contact', icon: 'fa-message', label: 'Contact support', sub: 'Get help via chat or email', type: 'arrow' },
            { id: 'terms', icon: 'fa-file-lines', label: 'Terms & privacy', sub: 'Legal information', type: 'arrow' },
        ],
    },
];

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ on, onChange }) {
    return (
        <button
            className={`pf__toggle${on ? ' pf__toggle--on' : ''}`}
            onClick={() => onChange(!on)}
            role="switch" aria-checked={on} aria-label="Toggle"
        >
            <span className="pf__toggle-thumb" />
        </button>
    );
}

// ─── Setting row ──────────────────────────────────────────────────────────────
function SettingRow({ item, toggleState, onToggle, onTap }) {
    const tappable = item.type === 'arrow';
    return (
        <div
            className={`pf__row${tappable ? ' pf__row--tappable' : ''}`}
            onClick={tappable ? onTap : undefined}
            role={tappable ? 'button' : undefined}
            tabIndex={tappable ? 0 : undefined}
        >
            <div className="pf__row-icon">
                <i className={`fas ${item.icon}`} />
            </div>
            <div className="pf__row-text">
                <span className="pf__row-label">{item.label}</span>
                <span className="pf__row-sub">{item.sub}</span>
            </div>
            {item.type === 'arrow' && <i className="fas fa-chevron-right pf__row-arrow" />}
            {item.type === 'toggle' && <Toggle on={toggleState} onChange={onToggle} />}
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProfileScreen({ onClose }) {
    const [visible, setVisible] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);  // ← new

    const [toggles, setToggles] = useState(() => {
        const map = {};
        SECTIONS.forEach(sec => sec.items.forEach(item => {
            if (item.type === 'toggle') map[item.id] = item.defaultOn;
        }));
        return map;
    });

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 380);
    };

    // Route arrow taps to their sub-screens
    const handleRowTap = (item) => {
        if (item.action === 'language') setShowLanguage(true);
        // future: add more actions here (safety, area, data, etc.)
    };

    return (
        <div className={`pf${visible ? ' pf--in' : ''}`}>

            <div className="pf__status-cover" />

            <div className="pf__header">
                <button className="pf__close" onClick={handleClose} aria-label="Close">
                    <i className="fas fa-times" />
                </button>
                <h1 className="pf__title">Profile</h1>
                <div className="pf__header-spacer" />
            </div>

            <div className="pf__body">

                {/* User card */}
                <div className="pf__user-card">
                    <div className="pf__avatar">
                        {/* <div className="pf__avatar-inner">MN</div> */}
                        <img src={Mandla_Ndlovu_Img} alt="Profile picture of Mandla Ndlovu" className="pf__avatar-img" />
                    </div>
                    <div className="pf__user-info">
                        <span className="pf__user-name">Mandla Ndlovu</span>
                        <span className="pf__user-email">mandlandlovu@gmail.com</span>
                    </div>
                    <button className="pf__edit-btn">Edit</button>
                </div>

                {/* Sections */}
                {SECTIONS.map((section) => (
                    <div className="pf__section" key={section.title}>
                        <span className="pf__section-title">{section.title}</span>
                        <div className="pf__section-card">
                            {section.items.map((item, i) => (
                                <div key={item.id}>
                                    <SettingRow
                                        item={item}
                                        toggleState={toggles[item.id]}
                                        onToggle={(val) => setToggles(prev => ({ ...prev, [item.id]: val }))}
                                        onTap={() => handleRowTap(item)}
                                    />
                                    {i < section.items.length - 1 && <div className="pf__divider" />}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Danger rows */}
                <div className="pf__section">
                    <div className="pf__section-card">
                        <button className="pf__danger-row">
                            <i className="fas fa-right-from-bracket pf__danger-icon pf__danger-icon--logout" />
                            <span className="pf__danger-label pf__danger-label--logout">Log out</span>
                        </button>
                        <div className="pf__divider" />
                        <button className="pf__danger-row">
                            <i className="fas fa-trash-can pf__danger-icon pf__danger-icon--delete" />
                            <span className="pf__danger-label pf__danger-label--delete">Delete account</span>
                        </button>
                    </div>
                </div>

                <div style={{ height: 32 }} />
            </div>

            {/* Language sub-screen slides in on top of ProfileScreen */}
            {showLanguage && (
                <LanguageScreen onBack={() => setShowLanguage(false)} />
            )}

        </div>
    );
}