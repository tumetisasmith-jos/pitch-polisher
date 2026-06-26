<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Gemini_AI-1.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</div>

<br/>

<div align="center">
  <h1>✨ Pitch Polisher</h1>
  <p><strong>AI-Powered Startup Pitch Analysis & Rewriting Platform</strong></p>
  <p>
    Upload your raw startup pitch, and our Gemini-powered AI will instantly analyze it,<br/>
    identify weaknesses, suggest improvements, and rewrite it for maximum investor impact.
  </p>
</div>

<br/>

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Powered Analysis** | Gemini 1.5 Flash evaluates pitch structure, narrative, and persuasiveness |
| ✅ **Strengths Detection** | Identifies what's already working well in your pitch |
| ⚠️ **Weakness Identification** | Highlights critical gaps that could cost you funding |
| 💡 **Actionable Improvements** | Provides concrete, specific suggestions to strengthen your pitch |
| ✍️ **Investor-Ready Rewrite** | Generates a fully polished version ready for investor meetings |
| 📊 **Pitch Score (0–100)** | Calculates an investor readiness score based on AI analysis |
| 🔐 **Secure Authentication** | Username/password auth with server-side sessions |
| 💾 **Cloud Workspace** | All pitches saved to a persistent SQLite database |
| 📋 **Copy to Clipboard** | One-click copy for the rewritten pitch |
| 🎨 **Premium Dark UI** | Glassmorphism, smooth animations, and a modern design system |
| 📱 **Fully Responsive** | Works beautifully on desktop, tablet, and mobile |
| 🛡️ **AI Guardrails** | Graceful error handling for API failures, timeouts, and rate limits |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | JavaScript (ES Modules) |
| **AI Engine** | Google Gemini 1.5 Flash |
| **Database** | SQLite via `better-sqlite3` |
| **Auth** | Server-side sessions with `iron-session` |
| **Styling** | Vanilla CSS with custom design system |
| **Deployment** | Render / Vercel |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────┐
│                  Client (Browser)                │
│  Landing Page │ Dashboard │ Editor │ AI Panel    │
└──────────────────┬───────────────────────────────┘
                   │ HTTP
┌──────────────────▼───────────────────────────────┐
│              Next.js App Router                  │
│                                                  │
│  Server Components    │   API Routes             │
│  • page.js (routing)  │   • /api/auth/login      │
│  • Dashboard.js       │   • /api/auth/logout     │
│  • layout.js          │   • /api/polish          │
│                       │     ├─ Input Validation  │
│  Client Components    │     ├─ Gemini API Call   │
│  • PitchEditorClient  │     └─ Error Handling    │
│  • Navbar.js          │                          │
│  • Footer.js          │                          │
└──────────┬────────────┴──────────┬───────────────┘
           │                       │
    ┌──────▼──────┐         ┌──────▼──────┐
    │   SQLite    │         │  Gemini AI  │
    │  Database   │         │  1.5 Flash  │
    └─────────────┘         └─────────────┘
```

---

## 📸 Screenshots

> Add your screenshots to `public/screenshots/` and uncomment the lines below.

<!--
### Landing Page
![Landing Page](./public/screenshots/landing.png)

### Dashboard
![Dashboard](./public/screenshots/dashboard.png)

### AI Analysis
![AI Analysis](./public/screenshots/analysis.png)

### Editor
![Editor](./public/screenshots/editor.png)
-->

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** 18+ installed
- A **Google Gemini API Key** ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/tumetisasmith-jos/pitch-polisher.git
cd pitch-polisher

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
SESSION_SECRET=your_random_32_char_secret_here
```

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ | Your Google Gemini API key |
| `SESSION_SECRET` | ✅ | A random string for session encryption (32+ characters) |

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment

### Render

1. Push your code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repository
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Add environment variables (`GEMINI_API_KEY`, `SESSION_SECRET`)
7. Deploy!

### Vercel

```bash
npx vercel --prod
```

Or import the repository directly at [vercel.com/new](https://vercel.com/new).

---

## 📁 Folder Structure

```
pitch-polisher/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js      # Login/Register API
│   │   │   └── logout/route.js     # Logout API
│   │   └── polish/route.js         # AI Analysis API (Gemini)
│   ├── login/page.js               # Auth page
│   ├── pitches/
│   │   ├── [id]/
│   │   │   ├── page.js             # Pitch detail (server)
│   │   │   └── PitchEditorClient.js # Editor + AI panel (client)
│   │   ├── new/page.js             # Create pitch
│   │   └── page.js                 # Pitch list
│   ├── actions.js                  # Server actions (CRUD)
│   ├── Dashboard.js                # Dashboard component
│   ├── Footer.js                   # Footer component
│   ├── globals.css                 # Design system
│   ├── LandingPage.js              # Landing page
│   ├── layout.js                   # Root layout
│   ├── Navbar.js                   # Navigation
│   ├── not-found.js                # Custom 404
│   └── page.js                     # Route controller
├── lib/
│   ├── db.js                       # SQLite database setup
│   └── session.js                  # iron-session config
├── .env.local                      # Environment variables (gitignored)
├── package.json
└── README.md
```

---

## 🔮 Future Improvements

- [ ] Pitch version history and diff view
- [ ] Team collaboration and shared workspaces
- [ ] PDF/PPTX export for investor decks
- [ ] Industry-specific pitch templates
- [ ] Comparative analysis against successful YC pitches
- [ ] Voice-to-pitch recording and transcription
- [ ] Advanced analytics dashboard with pitch score trends

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>
    Built with ❤️ using <strong>Next.js</strong> and <strong>Google Gemini AI</strong>
  </p>
  <p>
    <a href="https://github.com/tumetisasmith-jos/pitch-polisher">⭐ Star this repo</a> if you found it useful!
  </p>
</div>
