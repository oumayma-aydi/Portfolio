# Oumayma Aydi — Portfolio

A responsive React + Vite portfolio inspired by editorial developer portfolios, with the Rose Mist (#CFA7B5) / Slate Tide (#4F6478) palette, motion, project details, timeline, photo-memory placeholders, dark mode and a small "Ask me anything" chatbot.

## 1. Install the tools

- Install Node.js LTS from https://nodejs.org/
- Install Visual Studio Code from https://code.visualstudio.com/

## 2. Open in VS Code

1. Extract the ZIP file.
2. In VS Code, choose **File → Open Folder** and select `oumayma-portfolio`.
3. Open **Terminal → New Terminal**.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local address Vite prints, usually `http://localhost:5173`.

## 3. Add your own photos and CV

Create this folder if it does not exist: `public/`

- Copy your English CV into `public/CV_Oumayma_AYDI_English.pdf` (the Resume button expects this exact filename).
- Add your portrait as `public/images/oumayma.jpg`, then in `src/main.jsx` replace the placeholder inside `.portrait-placeholder` with:
  `<img className="portrait-photo" src="/images/oumayma.jpg" alt="Oumayma Aydi" />`
- Add event photos under `public/images/` and replace the gallery placeholder blocks with `<img>` tags. Keep images you have permission to publish, and ask others before featuring identifiable people.

Add this CSS for your portrait and gallery photos:

```css
.portrait-photo { width:100%; height:100%; object-fit:cover; position:absolute; inset:0; }
.gallery-visual img { width:100%; height:100%; object-fit:cover; }
```

## 4. Personalise the content

Open `src/main.jsx` and search for:
- `projects` — edit project descriptions, tech stack and links.
- `timeline` — edit education and experience.
- `skillGroups` — edit skills.
- `qa` — edit chatbot answers and supported questions.
- `Beyond the screen` — replace the three gallery placeholders with real event/hobby memories.
- `oumayma.aydi@etudiant-enit.utm.tn`, `oumayma-aydi` — update links if needed.

The content is based on the supplied CV. The hobbies and photo captions are deliberately placeholders: add only real personal details you want recruiters to know.

## 5. Important chatbot note

The included chatbot is a **curated frontend demo**. It does not call an AI model and does not send user questions to a server. Its answers are matched against keywords in `qa` in `src/main.jsx`.

For a genuine AI "ask me anything" chatbot, create a backend endpoint (for example with FastAPI or a serverless function) and call it from the frontend. **Never put an OpenAI/API secret in React or any `VITE_*` variable**, because browser code is public. Add rate limits, keep answers grounded in your approved portfolio content, and avoid giving the model private information.

## 6. Build for deployment

```bash
npm run build
npm run preview
```

The production files will be in `dist/`. You can deploy the project to Vercel or Netlify. Before publishing, test the mobile layout, links, CV download, accessibility and all personal details.

## Stack

- React + Vite
- Plain CSS
- Lucide icons
- No external chatbot API required for the demo

## Palette

All colors are CSS variables at the top of `src/style.css` (`--rose`, `--slate`, `--blush`, `--mist`, `--paper`, `--ink`, `--accent`). Change them there and the whole site updates, including dark mode.
