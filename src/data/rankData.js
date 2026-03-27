// src/data/rankData.js
// Images are imported at the top — Vite processes them into proper hashed URLs.
// A plain string like '../assets/images/foo.png' is NOT resolved by Vite
// inside a .js data file; it must be a real ES module import.

import bosmanImg    from '../assets/images/Bosman_TR.png';
import belleImg     from '../assets/images/Belle_Ombre_TR.jpg';
import bloedImg     from '../assets/images/Bloed_St_Mall_TR.jpg';
import centurionImg from '../assets/images/Centurion_TR.png';

export const RANKS = [
  {
    id: 1,
    name: 'Bosman Station Taxi Rank',
    shortName: 'Bosman Station Taxi...',
    address: '0126 Jeff Masemola St, Pretoria Central, Pretoria, 0002',
    walkLabel: 'Short Walk',
    km: '900 m',
    min: '4 min',
    hours: 'Daily 7am – 9am, 4pm – 6pm',
    audience: 'Mostly workers & students',
    rating: 4.1,
    ratingCount: 1773,
    breakdown: [55, 25, 10, 6, 4],
    image: bosmanImg,
    safetyTips: [
      { icon: 'fa-triangle-exclamation', text: 'Keep valuables close. Keep phone and bag zipped and in front.' },
      { icon: 'fa-circle-check',         text: 'Ask rank marshals for help if unsure where to stand or which taxi to take.' },
      { icon: 'fa-phone',                text: 'Share trip with trusted contact before you arrive.' },
    ],
    mapBbox: '28.1950,-25.7480,28.2050,-25.7380',
  },
  {
    id: 2,
    name: 'Belle Ombre Taxi Rank',
    shortName: 'Belle Ombre Taxi Rank',
    address: 'Schubart St, Daspoort 319-Jr, Pretoria, 0002',
    walkLabel: 'Short Walk',
    km: '2.2 km',
    min: '8 min',
    hours: 'Daily 7am – 9am, 4pm – 6pm',
    audience: 'Mostly workers & students',
    rating: 3.7,
    ratingCount: 3,
    breakdown: [40, 30, 15, 10, 5],
    image: belleImg,
    safetyTips: [
      { icon: 'fa-triangle-exclamation', text: 'Rank can be crowded during peak hours. Keep phone and bag zipped and in front.' },
      { icon: 'fa-circle-check',         text: 'Ask rank marshals for help if unsure where to stand or which taxi to take.' },
      { icon: 'fa-phone',                text: 'Use your safety settings to share live location until you arrive.' },
    ],
    mapBbox: '28.1880,-25.7460,28.2000,-25.7360',
  },
  {
    id: 3,
    name: 'Bloed Street Mall Taxi Rank',
    shortName: 'Bloed Street Mall Tax...',
    address: '317 Bloed St, Pretoria Central, Pretoria, 0002',
    walkLabel: 'Medium Walk',
    km: '3.4 km',
    min: '12 min',
    hours: 'Daily 7am – 9am, 4pm – 6pm',
    audience: 'Mostly workers & students',
    rating: 4.7,
    ratingCount: 3,
    breakdown: [80, 12, 5, 2, 1],
    image: bloedImg,
    safetyTips: [
      { icon: 'fa-triangle-exclamation', text: 'Rank can be crowded during peak hours. Keep phone and bag zipped and in front.' },
      { icon: 'fa-circle-check',         text: 'Ask rank marshals for help if unsure where to stand or which taxi to take.' },
      { icon: 'fa-phone',                text: 'Use your safety settings to share live location until you arrive.' },
    ],
    mapBbox: '28.1860,-25.7450,28.2000,-25.7340',
  },
  {
    id: 4,
    name: 'Centurion Taxi Rank',
    shortName: 'Centurion Taxi Rank...',
    address: '2026 Hendrik Verwoerd Dr, Centurion Central, Centurion, 0046',
    walkLabel: 'Long Walk',
    km: '13 km',
    min: '15 min',
    hours: 'Daily 7am – 9am, 4pm – 6pm',
    audience: 'Mostly workers & students',
    rating: 3.9,
    ratingCount: 441,
    breakdown: [42, 28, 18, 8, 4],
    image: centurionImg,
    safetyTips: [
      { icon: 'fa-triangle-exclamation', text: 'Keep valuables close. Keep phone and bag zipped and in front.' },
      { icon: 'fa-circle-check',         text: 'Ask rank marshals for help if unsure where to stand or which taxi to take.' },
      { icon: 'fa-phone',                text: 'Share trip with trusted contact to share live location until you arrive.' },
    ],
    mapBbox: '28.1400,-25.8700,28.1900,-25.8300',
  },
];