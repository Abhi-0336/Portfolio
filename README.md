# Abhi — Creative Portfolio

Responsive single-page portfolio built with **separate HTML, CSS, and JavaScript files**. It includes a live Milky Way-style background (drifting nebula clouds, twinkling stars, and shooting stars), dark/light mode, mobile navigation, animated sections, skill and interest cards without progress bars or ratings, projects, education, achievements, social links, and contact details. Certificate photos are not included.

## Project structure

- `index.html` — page content and structure
- `styles.css` — all styling, layout, responsive rules, and visual effects
- `script.js` — animated starfield, theme toggle, mobile navigation, current year, and reveal animations
- `assets/ADD-YOUR-PHOTO-HERE.txt` — reminder to add your photo
- `assets/profile.jpg` — add your own portrait here (not included)

## Run locally

Keep all files in this same folder, then open `index.html` in a modern browser. The background animation runs locally; no background image or video is required. Google Fonts requires an internet connection, with system-font fallbacks provided.

## Add your photo

Place your own portrait at `assets/profile.jpg`. Keep the filename exactly `profile.jpg`. If no photo is added, the design falls back to an Abhi monogram.

## Social links already configured

- GitHub: https://github.com/Abhi-0336/
- LinkedIn: https://www.linkedin.com/in/abhilash-d-b1594b424/
- Instagram: https://www.instagram.com/stories_with_abhi/
- Email: abhi930046@gmail.com
- Project: https://abhi-0336.github.io/eshwa/

## Connect YouTube

Open `script.js`, find `const YOUTUBE_CHANNEL_URL = "";`, and paste your YouTube channel URL between the quotes.

## Publish with GitHub Pages

1. Upload `index.html`, `styles.css`, `script.js`, `README.md`, and the `assets` folder to the repository root.
2. Open **Settings → Pages** on GitHub.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site.

## Live background

The starfield is rendered using canvas in `script.js`, and the nebula glow is styled in `styles.css`. The animation respects the device's reduced-motion setting.
