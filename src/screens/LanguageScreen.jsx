import { useState, useEffect } from 'react';
import '../styles/language.scss';

const LANGUAGES = [
    'Afrikaans',
    'English',
    'IsiNdebele',
    'IsiXhosa',
    'IsiZulu',
    'Sepedi (Northern Sotho)',
    'Sesotho (Southern Sotho)',
    'Setswana',
    'Siswati (Swati)',
    'Tshivenda',
    'Xitsonga',
];

const DEFAULT_LANGUAGE = 'English';

export default function LanguageScreen({ onBack }) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(DEFAULT_LANGUAGE);
    const [confirmed, setConfirmed] = useState(DEFAULT_LANGUAGE); // last saved

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const handleSelect = (lang) => {
        setSelected(lang);
        setConfirmed(lang); // auto-confirm on tap (matching the design)
    };

    return (
        <div className={`lang${visible ? ' lang--in' : ''}`}>

            {/* Status bar cover */}
            <div className="lang__status-cover" />

            {/* Header */}
            <div className="lang__header">
                <button className="lang__back" onClick={onBack} aria-label="Back">
                    <i className="fas fa-chevron-left" />
                </button>
                <h1 className="lang__title">Select language</h1>
                <div className="lang__header-spacer" />
            </div>

            {/* Language list */}
            <div className="lang__body">
                <div className="lang__list">
                    {LANGUAGES.map((lang, i) => {
                        const isSelected = lang === selected;
                        const isDefault = lang === DEFAULT_LANGUAGE;
                        const subLabel = isSelected
                            ? (isDefault && confirmed === DEFAULT_LANGUAGE ? 'Default Selection' : 'Selected')
                            : null;

                        return (
                            <div key={lang}>
                                <button
                                    className={`lang__row${isSelected ? ' lang__row--selected' : ''}`}
                                    onClick={() => handleSelect(lang)}
                                >
                                    {/* Radio circle */}
                                    <div className={`lang__radio${isSelected ? ' lang__radio--on' : ''}`}>
                                        {isSelected && <div className="lang__radio-dot" />}
                                    </div>

                                    {/* Label + optional sub */}
                                    <div className="lang__row-text">
                                        <span className="lang__row-label">{lang}</span>
                                        {subLabel && (
                                            <span className="lang__row-sub">{subLabel}</span>
                                        )}
                                    </div>
                                </button>

                                {/* Divider between rows */}
                                {i < LANGUAGES.length - 1 && (
                                    <div className="lang__divider" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}