import { useState } from 'react';
import { IconUser, IconPhone, IconMail, GoogleIcon, FacebookIcon } from '../components/Icons';
import PasswordInput from '../components/PasswordInput';

export default function SignUpScreen({ goTo }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', tos: true });

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  return (
    <div className="screen-content screen-enter">
      <div className="greeting">Hey there,</div>
      <div className="greeting-name">Create an Account</div>

      {/* Full Name */}
      <div className="input-group">
        <div className="input-icon"><IconUser /></div>
        <input
          className="input-field"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={set('name')}
        />
      </div>

      {/* Phone */}
      <div className="input-group">
        <div className="input-icon"><IconPhone /></div>
        <input
          className="input-field"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={set('phone')}
        />
      </div>

      {/* Email */}
      <div className="input-group">
        <div className="input-icon"><IconMail /></div>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={set('email')}
        />
      </div>

      {/* Password */}
      <PasswordInput
        placeholder="Password"
        value={form.password}
        onChange={set('password')}
      />

      {/* ToS */}
      <div className="checkbox-row">
        <input
          type="checkbox"
          id="tos"
          checked={form.tos}
          onChange={set('tos')}
        />
        <label htmlFor="tos">
          By continuing you accept our{' '}
          <a href="#">Privacy Policy</a> and <a href="#">Term of Use</a>
        </label>
      </div>

      <button className="btn-primary" onClick={() => goTo(1)}>
        Register
      </button>

      <div className="or-divider">
        <div /><span>Or</span><div />
      </div>

      <div className="social-btns">
        <button className="social-btn" aria-label="Sign up with Google">
          <GoogleIcon />
        </button>
        <button className="social-btn" aria-label="Sign up with Facebook">
          <FacebookIcon />
        </button>
      </div>

      <div className="footer-text">
        Already have an account?{' '}
        <button onClick={() => goTo(1)}>Login</button>
      </div>
    </div>
  );
}
