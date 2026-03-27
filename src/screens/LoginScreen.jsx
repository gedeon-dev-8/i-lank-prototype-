import { useState } from 'react';
import { IconMail, IconLogin, GoogleIcon, FacebookIcon } from '../components/Icons';
import PasswordInput from '../components/PasswordInput';

export default function LoginScreen({ goTo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="screen-content screen-enter">
      <div className="greeting">Hey there,</div>
      <div className="greeting-name">Welcome Back</div>

      {/* Email */}
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

      {/* Password */}
      <PasswordInput
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Forgot password */}
      <div className="forgot-link">
        <button onClick={() => goTo(2)}>Forgot your password?</button>
      </div>

      <button className="btn-primary" onClick={() => alert('Login successful!')}>
        <IconLogin />
        Login
      </button>

      <div className="or-divider">
        <div /><span>Or</span><div />
      </div>

      <div className="social-btns">
        <button className="social-btn" aria-label="Login with Google">
          <GoogleIcon />
        </button>
        <button className="social-btn" aria-label="Login with Facebook">
          <FacebookIcon />
        </button>
      </div>

      <div className="footer-text">
        Don't have an account yet?{' '}
        <button onClick={() => goTo(0)}>Register</button>
      </div>
    </div>
  );
}
