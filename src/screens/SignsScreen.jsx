import { useState, useEffect } from 'react';
import '../styles/signs.scss';

// ─── Hand signal illustrations (SVG, matching the coloured 3D hand style) ─────
import { HandCBDIllustration, HandSandtonIllustration, HandRandburgIllustration, HandGermistonIllustration, HandThembisaIllustration} from '../components/Illustrations';

// ─── Sign data ────────────────────────────────────────────────────────────────
const SIGNS = [
    {
        id: 1,
        name: 'Soweto Taxis',
        shortDesc: 'Hand flat facing down • Soweto-bound routes',
        Hand: HandRandburgIllustration,
        howTo: [
            { n: 1, title: 'Face the road safely', desc: 'Extend your arm slightly towards the road, relaxed but visible to oncoming taxis.' },
            { n: 2, title: 'Extend your arm slightly', desc: 'Hold your arm out and keep your hand flat, palm facing down, fingers together.' },
            { n: 3, title: 'Hold steady as taxis approach', desc: 'Keep the sign steady so drivers can read it. A gentle downward motion is okay.' },
        ],
        routes: [
            'CBD (Bree / Wanderers area) → Orlando & Diepkloof',
            'Johannesburg CBD → Pimville, Mapetla, Naledi',
            'Braamfontein / Newtown → Soweto via main arterial roads',
        ],
        culture: [
            { icon: 'fa-users', title: 'Widely recognised around Joburg', desc: 'Most taxi drivers in and around the CBD know this sign means you are going to Soweto.' },
            { icon: 'fa-circle-info', title: 'Ask before boarding if unsure', desc: "If unsure of the taxi's destination in Soweto, ask the driver or passengers before boarding." },
            { icon: 'fa-face-smile', title: 'Be confident but respectful', desc: 'Using hand signs is part of daily life in the taxi system. Showing the sign confidently helps drivers know you are ready.' },
        ],
    },
    {
        id: 2,
        name: 'City Center (CBD)',
        shortDesc: 'Index finger facing up • CBD-bound routes',
        Hand: HandCBDIllustration,
        howTo: [
            { n: 1, title: 'Point index finger up', desc: 'Raise one hand with index finger pointing straight up, arm slightly extended.' },
            { n: 2, title: 'Keep other fingers folded', desc: 'Fold remaining fingers into a loose fist to make the sign clear to drivers.' },
            { n: 3, title: 'Hold until taxi slows', desc: 'Maintain the sign until a taxi acknowledges you by slowing down or flashing lights.' },
        ],
        routes: [
            'Suburbs → Johannesburg CBD (Bree St / Park Station)',
            'Soweto → Joburg CBD via main routes',
            'East Rand → CBD via N12 or R24',
        ],
        culture: [
            { icon: 'fa-users', title: 'Universal CBD sign', desc: 'Recognised across all Gauteng taxi routes heading into the city centre.' },
            { icon: 'fa-circle-info', title: 'Confirm your drop-off', desc: 'CBD covers many stops — confirm if you need Park Station, Bree St or Gandhi Square.' },
            { icon: 'fa-face-smile', title: 'Works at most taxi ranks', desc: 'This sign works both at official ranks and informal stopping points along main roads.' },
        ],
    },
    {
        id: 3,
        name: 'Sandton Taxis',
        shortDesc: 'Index finger facing down • Sandton-bound routes',
        Hand: HandSandtonIllustration,
        howTo: [
            { n: 1, title: 'Point index finger down', desc: 'Extend arm with index finger pointing downward, palm facing inward.' },
            { n: 2, title: 'Angle slightly outward', desc: 'Tilt the sign slightly outward so oncoming taxis can see it clearly.' },
            { n: 3, title: 'Hold steady', desc: 'Keep arm steady at shoulder height while waiting.' },
        ],
        routes: [
            'CBD → Sandton City / Sandton station',
            'Alexandra → Sandton via London Rd',
            'Randburg → Sandton via William Nicol',
        ],
        culture: [
            { icon: 'fa-users', title: 'Common commuter route', desc: 'One of the busiest corridors in Joburg — taxis run frequently during peak hours.' },
            { icon: 'fa-circle-info', title: 'Distinguish from Soweto', desc: 'Sandton sign points down with a single finger; Soweto uses a flat open palm facing down.' },
            { icon: 'fa-face-smile', title: 'Gauge in advance', desc: 'Position yourself early at busy intersections to catch taxis before they fill up.' },
        ],
    },
    {
        id: 4,
        name: 'Thembisa Taxis',
        shortDesc: 'Right hand flat facing down with left hand fingers joining upwards • Thembisa-bound routes',
        Hand: HandThembisaIllustration,
        howTo: [
            { n: 1, title: 'Right hand flat, facing down', desc: 'Extend right arm with palm facing down, fingers together.' },
            { n: 2, title: 'Left hand fingers point up', desc: 'Bring left hand fingers upward from below, meeting the right hand.' },
            { n: 3, title: 'Hold the combined sign', desc: 'Maintain both hands in position until a taxi acknowledges you.' },
        ],
        routes: [
            'Kempton Park → Thembisa via R25',
            'Edenvale → Thembisa via Van Riebeeck Ave',
            'OR Tambo area → Thembisa central',
        ],
        culture: [
            { icon: 'fa-users', title: 'Two-hand sign', desc: 'The two-hand combination makes this sign distinct and easy for drivers to recognise from afar.' },
            { icon: 'fa-circle-info', title: 'Practice before going', desc: 'Practice the two-hand coordination before standing at the road — it can be tricky the first time.' },
            { icon: 'fa-face-smile', title: 'Ask locals to confirm', desc: 'Different stops in Thembisa may have slight sign variations. Ask fellow commuters if unsure.' },
        ],
    },
    {
        id: 5,
        name: 'Noord CBD Taxis',
        shortDesc: 'Hand facing down • Noord CBD-bound routes',
        Hand: HandRandburgIllustration,
        howTo: [
            { n: 1, title: 'Open palm facing down', desc: 'Extend arm with all fingers spread and palm facing the ground.' },
            { n: 2, title: 'Hold at waist height', desc: 'Keep sign at waist to chest height for best visibility.' },
            { n: 3, title: 'Wave gently if needed', desc: 'A slow downward wave can help attract the attention of passing taxis.' },
        ],
        routes: [
            'Suburbs → Noord Taxi Rank (Joburg)',
            'East Rand → Noord via N12',
            'South Joburg → Noord via main roads',
        ],
        culture: [
            { icon: 'fa-users', title: 'Noord is the hub', desc: 'Noord Street Taxi Rank is one of the biggest in South Africa — most inter-city routes pass through here.' },
            { icon: 'fa-circle-info', title: 'Multiple bays', desc: 'Confirm which bay your destination departs from — Noord has many lanes.' },
            { icon: 'fa-face-smile', title: 'Arrive early for long routes', desc: 'For inter-city trips, arrive early as taxis fill fast during morning peak.' },
        ],
    },
    {
        id: 6,
        name: 'Germiston to Katlehong',
        shortDesc: 'Outward facing hand flat • Germiston–Katlehong routes',
        Hand: HandGermistonIllustration,
        howTo: [
            { n: 1, title: 'Palm facing outward', desc: 'Hold arm out with palm facing away from your body, fingers together.' },
            { n: 2, title: 'Arm at shoulder height', desc: 'Keep arm roughly at shoulder height so it is visible to oncoming drivers.' },
            { n: 3, title: 'Rotate slightly if needed', desc: 'A slight outward rotation of the wrist helps make the sign more distinct.' },
        ],
        routes: [
            'Germiston CBD → Katlehong central',
            'Alberton → Katlehong via R554',
            'Joburg CBD → Katlehong via East Rand routes',
        ],
        culture: [
            { icon: 'fa-users', title: 'East Rand corridor', desc: 'A key commuter corridor connecting Germiston with the large Katlehong township.' },
            { icon: 'fa-circle-info', title: 'Know your stop', desc: 'Katlehong is large — confirm your specific stop with the driver before boarding.' },
            { icon: 'fa-face-smile', title: 'Taxis run all day', desc: 'This route operates from early morning to late evening with frequent departures.' },
        ],
    },
];

// ─── Sign detail screen ───────────────────────────────────────────────────────
function SignDetail({ sign, onBack }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className={`sign-detail${visible ? ' sign-detail--in' : ''}`}>
            <div className="sign-detail__status-cover" />

            {/* Header */}
            <div className="sign-detail__header">
                <button className="sign-detail__back" onClick={onBack} aria-label="Back">
                    <i className="fas fa-chevron-left" />
                </button>
                <h1 className="sign-detail__title">{sign.name}</h1>
            </div>

            {/* Scrollable body */}
            <div className="sign-detail__body">

                {/* Hero card */}
                <div className="sign-detail__hero">
                    <div className="sign-detail__hero-img">
                        <sign.Hand />
                    </div>
                    <div className="sign-detail__hero-info">
                        <span className="sign-detail__hero-name">{sign.name}</span>
                        <span className="sign-detail__hero-desc">{sign.shortDesc}</span>
                    </div>
                </div>

                {/* How to show the sign */}
                <div className="sign-detail__section">
                    <h2 className="sign-detail__section-title">How to show the sign</h2>
                    <div className="sign-detail__steps">
                        {sign.howTo.map((step) => (
                            <div className="sign-detail__step" key={step.n}>
                                <div className="sign-detail__step-num">{step.n}</div>
                                <div className="sign-detail__step-text">
                                    <span className="sign-detail__step-title">{step.title}</span>
                                    <span className="sign-detail__step-desc">{step.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular routes */}
                <div className="sign-detail__section">
                    <h2 className="sign-detail__section-title">Popular routes with this sign</h2>
                    <div className="sign-detail__routes">
                        {sign.routes.map((route, i) => (
                            <div className="sign-detail__route" key={i}>
                                <i className="fas fa-location-dot sign-detail__route-icon" />
                                <span>{route}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Context & culture */}
                <div className="sign-detail__section">
                    <h2 className="sign-detail__section-title">Context &amp; culture</h2>
                    <div className="sign-detail__culture">
                        {sign.culture.map((item, i) => (
                            <div className="sign-detail__culture-row" key={i}>
                                <div className="sign-detail__culture-icon">
                                    <i className={`fas ${item.icon}`} />
                                </div>
                                <div className="sign-detail__culture-text">
                                    <span className="sign-detail__culture-title">{item.title}</span>
                                    <span className="sign-detail__culture-desc">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ height: 24 }} />
            </div>
        </div>
    );
}

// ─── Signs list screen ────────────────────────────────────────────────────────
export default function SignsScreen({ onClose }) {
    const [visible, setVisible] = useState(false);
    const [showProTip, setShowProTip] = useState(true);
    const [selectedSign, setSelectedSign] = useState(null);

    useEffect(() => {
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <div className={`signs${visible ? ' signs--in' : ''}`}>
            <div className="signs__status-cover" />

            {/* Header */}
            <div className="signs__header">
                <button className="signs__close" onClick={onClose} aria-label="Close">
                    <i className="fas fa-times" />
                </button>
                <h1 className="signs__title">Commuter Signs Guide</h1>
            </div>

            {/* Scrollable body */}
            <div className="signs__body">

                {showProTip && (
                    <div className="signs__protip">
                        <div className="signs__protip-icon"><i className="fas fa-lightbulb" /></div>
                        <div className="signs__protip-text">
                            <span className="signs__protip-label">Pro tip!</span>
                            <span className="signs__protip-desc">
                                Hand signs can vary slightly by area. Always follow local guidance and stay aware of your surroundings.
                            </span>
                        </div>
                        <button className="signs__protip-close" onClick={() => setShowProTip(false)} aria-label="Dismiss">
                            <i className="fas fa-times" />
                        </button>
                    </div>
                )}

                {/* Sign cards */}
                <div className="signs__list">
                    {SIGNS.map((sign, i) => (
                        <button
                            key={sign.id}
                            className="signs__card"
                            style={{ animationDelay: `${i * 50}ms` }}
                            onClick={() => setSelectedSign(sign)}
                        >
                            <div className="signs__card-thumb">
                                <sign.Hand />
                            </div>
                            <div className="signs__card-info">
                                <span className="signs__card-name">{sign.name}</span>
                                <span className="signs__card-desc">{sign.shortDesc}</span>
                            </div>
                            <i className="fas fa-chevron-right signs__card-arrow" />
                        </button>
                    ))}
                </div>

                <div style={{ height: 16 }} />
            </div>

            {/* Sign detail slides in on top */}
            {selectedSign && (
                <SignDetail
                    sign={selectedSign}
                    onBack={() => setSelectedSign(null)}
                />
            )}
        </div>
    );
}