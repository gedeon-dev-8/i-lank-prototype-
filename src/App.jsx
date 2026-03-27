import { useState } from 'react';
import PhoneShell from './components/PhoneShell';
import SplashScreen from './screens/SplashScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import EnterOtpScreen from './screens/EnterOtpScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import SuccessScreen from './screens/SuccessScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import './styles.scss';

// Screen index reference:
//  0 - SignUp
//  1 - Login
//  2 - ForgotPassword
//  3 - EnterOtp
//  4 - ResetPassword
//  5 - Success
//  6 - Onboarding
//  7 - Home  ← new

const SCREEN_LABELS = [
  'Sign Up', 'Login', 'Forgot PW',
  'Enter OTP', 'Reset PW', 'Success',
  'Onboarding', 'Home',
];

const screens = [
  SignUpScreen,
  LoginScreen,
  ForgotPasswordScreen,
  EnterOtpScreen,
  ResetPasswordScreen,
  SuccessScreen,
  OnboardingScreen,
  HomeScreen,
];

// Screens that need a green status bar
const GREEN_STATUS_BAR_SCREENS = new Set([6, 7]);

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [current, setCurrent] = useState(0);

  const goTo = (index) => {
    if (index >= 0 && index < screens.length) setCurrent(index);
  };

  const ActiveScreen = screens[current];

  // HomeScreen is full-bleed (no status bar padding needed from shell)
  const isFullBleed = current === 7;

  return (
    <div className="app-wrapper">
      <PhoneShell
        greenStatusBar={GREEN_STATUS_BAR_SCREENS.has(current)}
        transparentStatusBar={isFullBleed}
      >
        {showSplash && (
          <SplashScreen onDone={() => setShowSplash(false)} />
        )}
        <ActiveScreen key={current} goTo={goTo} />
      </PhoneShell>

      {/* {!showSplash && (
        <>
          <div className="ext-nav-dots">
            {screens.map((_, i) => (
              <button
                key={i}
                className={`ext-nav-dot${i === current ? ' active' : ''}`}
                style={{ width: i === current ? 26 : 8 }}
                onClick={() => goTo(i)}
                title={SCREEN_LABELS[i]}
                aria-label={`Go to ${SCREEN_LABELS[i]}`}
              />
            ))}
          </div>
          <div className="nav-hint">
            Tap dots or use the in-screen buttons to navigate
          </div>
        </>
      )} */}

      <>
        <div className="ext-nav-dots">
          {screens.map((_, i) => (
            <button
              key={i}
              className={`ext-nav-dot${i === current ? ' active' : ''}`}
              style={{ width: i === current ? 26 : 8 }}
              onClick={() => goTo(i)}
              title={SCREEN_LABELS[i]}
              aria-label={`Go to ${SCREEN_LABELS[i]}`}
            />
          ))}
        </div>
        <div className="nav-hint">
          Tap dots or use the in-screen buttons to navigate
        </div>
      </>

    </div>
  );
}