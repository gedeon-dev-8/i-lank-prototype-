# i-LANK

> **The smart commuter companion for South African taxi riders.**  
> Find ranks, decode hand signals, plan routes and rate your experience — all in one place.

<p align="center">
  <img width="220" alt="i-LANK Home Screen" src="https://github.com/user-attachments/assets/447d1a9e-19a8-451e-adb2-b6601e93b1f9" />
  <img width="220" alt="Route Planner" src="https://github.com/user-attachments/assets/39c43172-a816-4bac-b0d3-6c1b97dca893" />
  <img width="220" alt="Signs Guide" src="https://github.com/user-attachments/assets/7b785213-d438-4709-b96b-96baaac12fdf" />
  <img width="220" alt="Profile" src="https://github.com/user-attachments/assets/077346cc-4ad8-4d3e-90a6-998b6e8ea644" />
  <img width="220" alt="Start Route To Rank" src="https://github.com/user-attachments/assets/664cf137-eeaf-484d-8b3f-5ecc91cdb8d8" />
  <img width="220" alt="Rank Details" src="https://github.com/user-attachments/assets/bf76d7fc-3613-4592-92cd-7760edcb8a61" />
</p>



<p align="center">

  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react"/>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite"/>
  <img alt="SCSS" src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white"/>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green?style=flat-square"/>
  <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square"/>
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Live Map** | Interactive OpenStreetMap centred on Pretoria CBD — pan and zoom freely |
| 🛣️ **Route Planner** | Search origin + destination, view nearby taxi ranks with walk times and delay status |
| ✋ **Signs Guide** | All 11 SA hand signals with step-by-step instructions, popular routes and cultural context |
| 📖 **Commuter Guide** | Offline-ready SA Taxi Rank Guide — quick tips, etiquette and hand signal grid |
| ⭐ **Ratings & Reviews** | Browse rank ratings, read community reviews and submit your own with a star picker |
| 👤 **Profile & Settings** | Language selector (all 11 official SA languages), notification toggles, safety preferences |
| 🔒 **Location Permission Flow** | Onboarding sheet requesting location access before revealing the map |
| 💫 **Animated Onboarding** | 5-slide stepper with illustrated cards |
| 🔐 **Auth Flow** | Sign up, log in, forgot password, OTP verification, reset password |

---

## 📱 Screens

```
Auth            Onboarding       Home             Route Planner
──────          ──────────       ────             ─────────────
Sign Up     →   5-slide      →   Map View     →   Search
Log In          stepper          ├── Signs         Results
Forgot PW                        ├── Guide         Route Map
OTP                              ├── Ratings       Rank Detail
Reset PW                         │   └── Reviews   ├── Info
Success                          │       └── Form  └── Reviews
                                 └── Profile
                                     └── Language
```

---

## 🛠️ Tech Stack

- **[React 18](https://react.dev/)** — UI framework
- **[Vite 5](https://vitejs.dev/)** — build tool and dev server
- **[SCSS (Sass)](https://sass-lang.com/)** — component-scoped styles with variables and mixins
- **[FontAwesome Free](https://fontawesome.com/)** — icons throughout
- **[Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins)** — typography
- **[OpenStreetMap](https://www.openstreetmap.org/)** — embedded maps via iframe

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/i-lank.git
cd i-lank

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.  
For the best experience, use browser DevTools → device emulation → **iPhone 14 Pro Max**.

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 📁 Project Structure

```
i-lank/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   ├── images/          # Taxi rank photos (Bosman, Belle Ombre, etc.)
│   │   ├── profiles/        # Reviewer profile photos
│   │   └── svgs/            # Onboarding illustrations
│   ├── components/
│   │   ├── Icons.jsx         # FontAwesome icon wrappers
│   │   ├── Illustrations.jsx # SVG illustration components
│   │   ├── PasswordInput.jsx # Show/hide password input
│   │   └── PhoneShell.jsx    # iPhone frame wrapper
│   ├── data/
│   │   └── rankData.js       # Central taxi rank data store
│   ├── screens/
│   │   ├── SplashScreen.jsx        # Animated logo splash
│   │   ├── OnboardingScreen.jsx    # 5-slide onboarding
│   │   ├── SignUpScreen.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── ForgotPasswordScreen.jsx
│   │   ├── EnterOtpScreen.jsx
│   │   ├── ResetPasswordScreen.jsx
│   │   ├── SuccessScreen.jsx
│   │   ├── HomeScreen.jsx          # Map + bottom nav hub
│   │   ├── RoutePlanner.jsx        # Search + results + route map
│   │   ├── RouteMapScreen.jsx      # Live route with rank info card
│   │   ├── RankDetailScreen.jsx    # Rank info, safety tips, ratings
│   │   ├── SignsScreen.jsx         # Hand signals list + detail
│   │   ├── GuideScreen.jsx         # Commuter guide
│   │   ├── RatingsScreen.jsx       # Rank ratings list
│   │   ├── RankReviewsScreen.jsx   # Reviews + rate & review form
│   │   ├── ProfileScreen.jsx       # User profile + settings
│   │   └── LanguageScreen.jsx      # Language selector
│   ├── styles/
│   │   ├── styles.scss             # Global variables, mixins, phone shell
│   │   ├── home.scss
│   │   ├── route-map.scss
│   │   ├── rank-detail.scss
│   │   ├── rank-reviews.scss
│   │   ├── signs.scss
│   │   ├── guide.scss
│   │   ├── ratings.scss
│   │   ├── profile.scss
│   │   └── language.scss
│   ├── App.jsx                     # Screen router
│   └── main.jsx
├── .gitignore
├── .eslintrc.cjs
├── index.html
├── vite.config.js
└── package.json
```

---

## 🖼️ Adding Your Own Assets

### Taxi rank images
Place photos in `src/assets/images/` and update the imports in `src/data/rankData.js`:

```js
import bosmanImg from '../assets/images/Bosman_TR.png';

export const RANKS = [
  {
    id: 1,
    name: 'Bosman Station Taxi Rank',
    image: bosmanImg,
    // ...
  },
];
```

### Reviewer profile photos
Place photos in `src/assets/profiles/` and update the `PROFILE_IMAGES` map in `RankReviewsScreen.jsx`:

```js
import ThandoImg from '../assets/profiles/Thando_Mokoena.png';

const PROFILE_IMAGES = {
  'Thando Mokoena': ThandoImg,
};
```

---

## 🎨 Design Tokens

Core SCSS variables used throughout (`src/styles/styles.scss`):

```scss
$green:       #3a7d44;
$green-light: #4a9e57;
$green-dark:  #2d6035;
$bg:          #f0f4f0;
$card:        #ffffff;
$text:        #1a1a1a;
$muted:       #888888;
$font-body:   'Poppins', sans-serif;
```

---

## 🗺️ Taxi Rank Data

All rank data lives in `src/data/rankData.js`. Each rank entry supports:

```js
{
  id:         Number,       // unique identifier
  name:       String,       // full display name
  address:    String,       // street address
  walkLabel:  String,       // 'Short Walk' | 'Medium Walk' | 'Long Walk'
  km:         String,       // walking distance
  min:        String,       // ETA (e.g. '4 min')
  hours:      String,       // operating hours
  audience:   String,       // typical commuter type
  rating:     Number,       // 0–5
  ratingCount: Number,      // total number of ratings
  breakdown:  Number[],     // [5★%, 4★%, 3★%, 2★%, 1★%]
  image:      ImportedAsset, // Vite-processed image import
  safetyTips: Array,        // [{icon, text}]
  mapBbox:    String,       // OSM bbox string 'west,south,east,north'
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** your changes: `git commit -m 'feat: add my feature'`
4. **Push** to the branch: `git push origin feature/my-feature`
5. **Open** a Pull Request

### Commit message convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     new feature
fix:      bug fix
style:    CSS/SCSS changes only
refactor: code change with no functional difference
docs:     documentation only
chore:    build, config, tooling
```

---

## 🗓️ Roadmap

- [ ] Real GPS location integration
- [ ] Backend API for live rank data
- [ ] Push notifications for rank updates
- [ ] Offline PWA support
- [ ] User accounts and persistent reviews
- [ ] More cities beyond Pretoria CBD
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Android / iOS native app via React Native

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## 🙏 Acknowledgements

- Map data © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)
- Icons by [FontAwesome](https://fontawesome.com/)
- Typography by [Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins)
- Designed and built with ❤️ for South African commuters

---

<p align="center">
  Made in 🇿🇦 South Africa
</p>
