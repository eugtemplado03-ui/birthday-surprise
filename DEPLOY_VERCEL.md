# 🚀 Deploying Birthday Surprise to Vercel (1-Minute Guide)

Your project is completely configured for **Vercel Serverless Full-Stack Deployment**!

---

## 🌟 Method 1: Deploy with GitHub (Recommended & Easiest)

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and create a repository (e.g. `birthday-surprise`).
   - Run these commands in your project folder (`C:\Users\jorim\.gemini\antigravity-ide\scratch\birthday-surprise\`):
     ```bash
     git init
     git add .
     git commit -m "Deploy Birthday Surprise to Vercel"
     git branch -M main
     git remote add origin https://github.com/YOUR_GITHUB_USERNAME/birthday-surprise.git
     git push -u origin main
     ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account.
   - Click **"Add New..."** ➡️ **"Project"**.
   - Click **"Import"** next to your `birthday-surprise` repository.
   - Leave all default settings as they are (Vercel will automatically read [`vercel.json`](file:///C:/Users/jorim/.gemini/antigravity-ide/scratch/birthday-surprise/vercel.json) and [`api/index.js`](file:///C:/Users/jorim/.gemini/antigravity-ide/scratch/birthday-surprise/api/index.js)).
   - Click **"Deploy"**! 🎉

3. **Your Live Website**:
   - Within ~30 seconds, Vercel will give you a public URL (e.g. `https://birthday-surprise-xyz.vercel.app`).
   - You can share this link with anyone, anywhere in the world!

---

## 💻 Method 2: Deploy with Vercel CLI

In your terminal / PowerShell inside `C:\Users\jorim\.gemini\antigravity-ide\scratch\birthday-surprise\`:

```bash
# 1. Login to Vercel
npx vercel login

# 2. Deploy to production
npx vercel --prod
```

---

## ⚡ What Vercel Runs:

- **Frontend**: Served automatically from Vercel's global CDN Edge network (`index.html`, `style.css`, `script.js`).
- **Backend API**: Runs as instant Serverless Functions in [`api/index.js`](file:///C:/Users/jorim/.gemini/antigravity-ide/scratch/birthday-surprise/api/index.js) handling:
  - `POST /api/surprise` — Generates persistent shareable surprise URLs.
  - `GET /api/surprise/:id` — Loads the customized surprise.
  - `POST /api/wishes` — Records live birthday wishes.
