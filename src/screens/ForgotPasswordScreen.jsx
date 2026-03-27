import { useState } from 'react';
import { IconChevronLeft, IconMail } from '../components/Icons';
import { ForgotIllustration } from '../components/Illustrations';

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

export default function ForgotPasswordScreen({ goTo }) {
  const [email, setEmail] = useState('');

  return (
    <div className="screen-content screen-enter">
      <button className="back-btn" onClick={() => goTo(1)}>
        <IconChevronLeft />
      </button>

      <div className="illustration">
        <ForgotIllustration />
      </div>

      <StepDots active={0} />

      <div className="screen-title">Forgot Password</div>
      <div className="screen-subtitle">
        Enter your email address and we'll send a link to reset your password.
      </div>

      <div className="input-group">
        <div className="input-icon"><IconMail /></div>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="spacer" />

      <button className="btn-primary" onClick={() => goTo(3)}>
        Continue
      </button>
    </div>
  );
}
