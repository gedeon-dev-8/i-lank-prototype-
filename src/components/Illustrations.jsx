import forgotImg from '../assets/svgs/forgot-illustration.svg';
import otpImg from '../assets/svgs/otp-illustration.svg';
import resetImg from '../assets/svgs/reset-illustration.svg';

import homeImg from '../assets/svgs/home-illustration.svg';

import HandCBDImg from '../assets/signals/City_Center__CBD__Sign.png';
import HandSandtonImg from '../assets/signals/Joburg_to_Sandton_Sign.png';
import HandThembisaImg from '../assets/signals/Randburg_Thembisa_Sign.png';
import HandRandburgImg from '../assets/signals/Randburg_to_Noord_CBD_Sign.png';
import HandGermistonImg from '../assets/signals/Germiston_to_Katlehong_Sign.png';

/* ═══════════════════════════════════════════════════════════
  Onboarding Illustrations
═══════════════════════════════════════════════════════════ */

export function ForgotIllustration() {
  return (
    <img
      src={forgotImg}
      alt="Forgot password illustration"
      style={{ width: 200, height: 200, objectFit: 'contain' }}
    />
  );
}

export function OtpIllustration() {
  return (
    <img
      src={otpImg}
      alt="Enter OTP illustration"
      style={{ width: 200, height: 200, objectFit: 'contain' }}
    />
  );
}

export function ResetIllustration() {
  return (
    <img
      src={resetImg}
      alt="Reset password illustration"
      style={{ width: 200, height: 200, objectFit: 'contain' }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
  Home Screen Illustrations
═══════════════════════════════════════════════════════════ */

export function PersonPinIllustration() {
  return (
    <img
      src={homeImg}
      alt="Allow location access illustration"
      style={{ width: 200, height: 150, objectFit: 'contain' }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════
  Hand Signal Illustrations
═══════════════════════════════════════════════════════════ */

export function HandCBDIllustration() {
  return (
    <img
      src={HandCBDImg}
      alt="Represents a real SA taxi hand signal direction"
      style={{ width: 72, height: 72, objectFit: 'contain' }}
    />
  );
}

export function HandSandtonIllustration() {
  return (
    <img
      src={HandSandtonImg}
      alt="Represents a real SA taxi hand signal direction"
      style={{ width: 72, height: 72, objectFit: 'contain' }}
    />
  );
}

export function HandRandburgIllustration() {
  return (
    <img
      src={HandRandburgImg}
      alt="Represents a real SA taxi hand signal direction"
      style={{ width: 72, height: 72, objectFit: 'contain' }}
    />
  );
}

export function HandGermistonIllustration() {
  return (
    <img
      src={HandGermistonImg}
      alt="Represents a real SA taxi hand signal direction"
      style={{ width: 72, height: 72, objectFit: 'contain' }}
    />
  );
}

export function HandThembisaIllustration() {
  return (
    <img
      src={HandThembisaImg}
      alt="Represents a real SA taxi hand signal direction"
      style={{ width: 72, height: 72, objectFit: 'contain' }}
    />
  );
}