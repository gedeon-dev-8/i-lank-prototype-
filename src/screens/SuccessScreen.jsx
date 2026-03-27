import { IconCheck } from '../components/Icons';

export default function SuccessScreen({ goTo }) {
  return (
    <div className="screen-content screen-enter">
      <div className="success-container">
        <div className="success-icon">
          <IconCheck />
        </div>
        <div className="success-title">Password Reset!</div>
        <div className="success-desc">
          Your password has been successfully reset. You can now log in with
          your new password.
        </div>
      </div>

      <button className="btn-primary" onClick={() => goTo(1)}>
        Back to Login
      </button>
    </div>
  );
}