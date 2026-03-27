import { useState } from 'react';
import { IconChevronLeft } from '../components/Icons';
import { ResetIllustration } from '../components/Illustrations';
import PasswordInput from '../components/PasswordInput';

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

export default function ResetPasswordScreen({ goTo }) {
  const [newPw, setNewPw] = useState('');
  const [confPw, setConfPw] = useState('');

  const handleSubmit = () => {
    if (!newPw || !confPw) {
      alert('Please fill in both fields.');
      return;
    }
    if (newPw !== confPw) {
      alert('Passwords do not match.');
      return;
    }
    goTo(5);
  };

  return (
    <div className="screen-content screen-enter">
      <button className="back-btn" onClick={() => goTo(3)}>
        <IconChevronLeft />
      </button>

      <div className="illustration">
        <ResetIllustration />
      </div>

      <StepDots active={2} />

      <div className="screen-title">Reset Password</div>
      <div className="screen-subtitle">
        Create a new strong password that is at least 8 characters long and
        includes letters, numbers, and symbols.
      </div>

      <PasswordInput
        placeholder="New Password"
        value={newPw}
        onChange={(e) => setNewPw(e.target.value)}
      />

      <PasswordInput
        placeholder="Confirm Password"
        value={confPw}
        onChange={(e) => setConfPw(e.target.value)}
      />

      <div className="spacer" />

      <button className="btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
