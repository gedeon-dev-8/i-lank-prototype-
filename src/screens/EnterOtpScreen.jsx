import { useState, useRef } from 'react';
import { IconChevronLeft } from '../components/Icons';
import { OtpIllustration } from '../components/Illustrations';

const StepDots = ({ active }) => (
  <div className="step-dots">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className={`step-dot${i === active ? ' active' : ''}`}
        style={{ width: i === active ? 22 : 8 }}
      />
    ))}
  </div>
);

export default function EnterOtpScreen({ goTo }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 3) refs[index + 1].current.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs[index - 1].current.focus();
    }
  };

  return (
    <div className="screen-content screen-enter">
      <button className="back-btn" onClick={() => goTo(2)}>
        <IconChevronLeft />
      </button>

      <div className="illustration">
        <OtpIllustration />
      </div>

      <StepDots active={1} />

      <div className="screen-title">Enter OTP</div>
      <div className="screen-subtitle">
        We've sent a 4-digit code to your email{' '}
        <span>user@example.com</span>. The code will expire in 10 minutes.
      </div>

      <div className="otp-row">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={refs[i]}
            className="otp-input"
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>

      <div className="spacer" />

      <button className="btn-primary" onClick={() => goTo(4)}>
        Reset Password
      </button>

      <div className="footer-text">
        Didn't get OTP?{' '}
        <button onClick={() => alert('OTP resent!')}>Resend OTP</button>
      </div>
    </div>
  );
}
