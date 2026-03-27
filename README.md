# Auth Demo — React Web App

A fully interactive Sign Up / Login auth flow demo built with React + Vite,
styled to look like a native mobile app inside a phone shell.

## Screens included

| # | Screen |
|---|--------|
| 0 | Sign Up |
| 1 | Login |
| 2 | Forgot Password |
| 3 | Enter OTP |
| 4 | Reset Password |
| 5 | Success |

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173 in your browser.

## Project structure

```
src/
├── styles.css                  # All global styles + CSS variables
├── main.jsx                    # React entry point
├── App.jsx                     # Root component + screen router
├── components/
│   ├── Icons.jsx               # All SVG icons
│   ├── Illustrations.jsx       # SVG illustrations for flow screens
│   ├── PasswordInput.jsx       # Reusable password field with toggle
│   └── PhoneShell.jsx          # Phone frame wrapper (notch, status bar)
└── screens/
    ├── SignUpScreen.jsx
    ├── LoginScreen.jsx
    ├── ForgotPasswordScreen.jsx
    ├── EnterOtpScreen.jsx
    ├── ResetPasswordScreen.jsx
    └── SuccessScreen.jsx
```

## Customisation tips

- **Colors**: Edit CSS variables at the top of `styles.css`
- **Fonts**: Change the Google Fonts import in `styles.css`
- **Add screens**: Create a new file in `src/screens/`, import it in `App.jsx`,
  and add it to the `screens` array
- **Navigation**: Every screen receives a `goTo(index)` prop — call it with
  the target screen index to navigate
