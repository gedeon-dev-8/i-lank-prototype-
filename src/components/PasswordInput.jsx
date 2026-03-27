import { useState } from 'react';
import { IconLock, IconEye, IconEyeOff } from './Icons';

export default function PasswordInput({ placeholder = 'Password', value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="input-group">
      <div className="input-icon">
        <IconLock />
      </div>
      <input
        className="input-field"
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button className="eye-btn" onClick={() => setShow((s) => !s)} type="button">
        {show ? <IconEyeOff /> : <IconEye />}
      </button>
    </div>
  );
}
