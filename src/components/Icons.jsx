// All icons now use FontAwesome classes.
// SVG-only icons (Google, Facebook) remain as inline SVG.

export const IconUser = () => (
  <i className="fas fa-user" aria-hidden="true" />
);

export const IconPhone = () => (
  <i className="fas fa-phone" aria-hidden="true" />
);

export const IconMail = () => (
  <i className="fas fa-envelope" aria-hidden="true" />
);

export const IconLock = () => (
  <i className="fas fa-lock" aria-hidden="true" />
);

export const IconEye = () => (
  <i className="fas fa-eye" aria-hidden="true" />
);

export const IconEyeOff = () => (
  <i className="fas fa-eye-slash" aria-hidden="true" />
);

export const IconChevronLeft = () => (
  <i className="fas fa-chevron-left" aria-hidden="true" />
);

export const IconLogin = () => (
  <i className="fas fa-right-to-bracket" aria-hidden="true" />
);

export const IconCheck = () => (
  <i className="fas fa-check" style={{ fontSize: 36, color: 'white' }} aria-hidden="true" />
);

// Social icons — kept as SVG (coloured brand logos)
export const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 8 2.8l6-6C34.3 3.2 29.4 1 24 1 14.9 1 7.2 6.3 3.5 14l7 5.4C12.3 13.1 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-17.4z" />
    <path fill="#FBBC05" d="M10.5 28.6A14.5 14.5 0 019.5 24c0-1.6.3-3.1.7-4.6L3.2 14C1.2 17.4 0 21.1 0 24s1.2 6.6 3.2 10L10.5 28.6z" />
    <path fill="#34A853" d="M24 47c5.4 0 10-1.8 13.3-4.8l-7.4-5.7c-1.8 1.2-4.1 2-5.9 2-6.3 0-11.6-3.6-13.5-9.1L3 34.2C6.7 42 14.3 47 24 47z" />
  </svg>
);

export const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const WifiIcon = () => (
  <i className="fas fa-wifi" style={{ fontSize: 12 }} aria-hidden="true" />
);

export const BatteryIcon = () => (
  <i className="fas fa-battery-full" style={{ fontSize: 12 }} aria-hidden="true" />
);
