import { WifiIcon, BatteryIcon } from './Icons';

export default function PhoneShell({
  children,
  greenStatusBar = false,
  transparentStatusBar = false,
}) {
  const time = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  // Build status bar class
  let statusClass = 'status-bar';
  if (greenStatusBar) statusClass += ' status-bar--green';
  if (transparentStatusBar) statusClass += ' status-bar--transparent';

  return (
    <div className="phone-shell">
      <div className="phone-inner">
        {/* Notch */}
        <div className="notch">
          <div className="notch-camera" />
          <div className="notch-speaker" />
        </div>

        {/* Status Bar */}
        <div className={statusClass}>
          <span>{time}</span>
          <div className="status-icons">
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Screen content */}
        {children}

        {/* Home bar */}
        <div className="home-bar">
          <div className="home-bar-line" />
        </div>
      </div>
    </div>
  );
}