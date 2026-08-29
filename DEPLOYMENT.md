# 🚀 Full-Stack Deployment Guide for Birthday Surprise

This project is a complete **full-stack Node.js & Express application** featuring a responsive frontend, evasive physics engine, Web Audio music synthesizer, and backend REST APIs for creating persistent shareable surprise URLs and recording birthday wishes.

---

## 🌟 Quick Options Overview

| Platform | Type | Free Tier? | Deployment Time | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Render** | Full-Stack Web Service | ✅ Yes | 2 mins | Easiest zero-config full-stack hosting |
| **Vercel** | Serverless Node.js | ✅ Yes | 1 min | Fastest global CDN & serverless API |
| **Railway** | Full-Stack Container | ✅ Yes (Trial) | 2 mins | Instant GitHub repo connect |
| **Fly.io / Docker** | Containerized | ✅ Yes | 3 mins | Full Docker support with `Dockerfile` |
| **Netlify / GitHub Pages** | Static Frontend | ✅ Yes | 1 min | Frontend-only using URL query params |

---

## Option 1: 🚀 Deploy on Render (Recommended Full-Stack)

1. Create a free account at [render.com](https://render.com/).
2. Push your project files to a **GitHub** or **GitLab** repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Birthday Surprise"
   git remote add origin https://github.com/YOUR_USERNAME/birthday-surprise.git
   git push -u origin main
   ```
3. In Render Dashboard, click **New +** ➡️ **Web Service**.
4. Connect your GitHub repository.
5. Render will automatically detect the settings from `render.yaml` or you can enter:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`
6. Click **Create Web Service**. Within 1-2 minutes, you will receive a live URL like `https://birthday-surprise-xyz.onrender.com`!

---

## Option 2: ▲ Deploy on Vercel (Instant Serverless)

1. Install the Vercel CLI or sign in to [vercel.com](https://vercel.com/):
   ```bash
   npm i -g vercel
   ```
2. From the project directory, run:
   ```bash
   vercel
   ```
3. Follow the prompts (use default settings).
4. Vercel uses the included [`vercel.json`](file:///C:/Users/jorim/.gemini/antigravity-ide/scratch/birthday-surprise/vercel.json) to deploy your Express backend and frontend automatically.
5. You'll get an instant live production domain: `https://birthday-surprise.vercel.app`!

---

## Option 3: 🚂 Deploy on Railway

1. Go to [railway.app](https://railway.app/) and sign in with GitHub.
2. Click **New Project** ➡️ **Deploy from GitHub Repo**.
3. Select this repository. Railway automatically reads [`Dockerfile`](file:///C:/Users/jorim/.gemini/antigravity-ide/scratch/birthday-surprise/Dockerfile) or `package.json`.
4. Under **Settings** ➡️ **Networking**, click **Generate Domain** to get a public HTTPS link!

---

## Option 4: 🐳 Run with Docker (Local or Any Cloud VPS)

You can run this full-stack application anywhere Docker is installed:

```bash
# Build the Docker image
docker build -t birthday-surprise-app .

# Run container on port 3456
docker run -d -p 3456:3456 --name birthday-surprise birthday-surprise-app
```

Then open `http://localhost:3456` in your browser!

---

## Option 5: 🌐 Static Frontend-Only Hosting (GitHub Pages / Netlify)

If you only want to host the frontend statically without a Node server:
1. Upload [`birthday-surprise-standalone.html`](file:///C:/Users/jorim/.gemini/antigravity-ide/scratch/birthday-surprise/birthday-surprise-standalone.html) or `index.html` + `style.css` + `script.js` directly to **GitHub Pages**, **Netlify Drop**, or **Cloudflare Pages**.
2. Personalized links work statically via query parameters:
   `https://your-site.com/?to=Sarah&from=Alex&msg=Happy%20Birthday!`

---

## 🛠️ Backend API Endpoints Reference

- `GET /api/health` — Check server status & stats.
- `POST /api/surprise` — Create a personalized surprise and generate a shareable short ID (`/?id=xyz`).
- `GET /api/surprise/:id` — Retrieve stored surprise by ID.
- `POST /api/wishes` — Record a wish when the user blows out the birthday candle.
- `GET /api/wishes` — Retrieve recent birthday wishes.
