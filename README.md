# Swagat Kumar Sahoo — Portfolio

**Java Full Stack Developer** · Spring Boot · React · REST APIs

Live: [swagatkumar.dev](https://swagatkumar.dev)

---

## Setup

```bash
npm install
npm run dev       # development — http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## Before deploying

1. **Resume** — drop your CV as `public/resume.pdf`
2. **Photo** — replace `public/photo.jpg` with your actual photo (ideally 400×500px, JPEG)
3. **Project images** — replace the SVG placeholders in `public/projects/` with real screenshots (800×450px recommended)
4. **Contact form** — the form currently simulates sending. Wire it to [Formspree](https://formspree.io) or your own endpoint in `Contact.jsx` → `handleSubmit`
5. **Real URLs** — update GitHub repo links in `Projects.jsx` once repos are public
6. **Domain** — update `og:url` and `rel="canonical"` in `index.html`

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion 11
- Lucide React

## Project structure

```
src/
  components/
    Hero.jsx            ← landing, photo card, 3D tilt
    About.jsx           ← bio + photo card
    Skills.jsx          ← categorised chip grid
    CurrentlyBuilding.jsx  ← in-progress project + learning
    HowIBuild.jsx       ← system diagram + JWT flow
    Projects.jsx        ← 3 project cards with images
    WhyHireMe.jsx       ← evidence-backed hiring case
    Experience.jsx      ← timeline with real internship
    Contact.jsx         ← contact form + social links
    Navbar.jsx          ← sticky nav + dark/light toggle
  index.css             ← complete design system (tokens, dark/light)
public/
  resume.pdf            ← YOUR RESUME (add this file)
  photo.jpg             ← YOUR PHOTO (add this file)
  projects/
    taskflow.svg        ← replace with screenshot
    shopapi.svg         ← replace with screenshot
    datapulse.svg       ← replace with screenshot
```
