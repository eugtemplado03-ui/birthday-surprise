# 🚀 1-Minute Render Deployment Guide

Your project is ready to deploy on **[Render.com](https://render.com/)** as a dedicated Full-Stack Node.js web service!

---

## 🌟 Step-by-Step Instructions:

### Step 1: Sign in to Render
1. Go to **[render.com](https://render.com/)** and sign in (you can sign in with your GitHub account).

### Step 2: Create a New Web Service
1. In your Render Dashboard, click the **"New +"** button in the top right.
2. Select **"Web Service"**.
3. Choose **"Build and deploy from a Git repository"** and click **Next**.

### Step 3: Connect your Repository
1. Connect and select your repository: **`eugtemplado03-ui/birthday-surprise`**.
2. Render will automatically prefill everything from [`render.yaml`](https://github.com/eugtemplado03-ui/birthday-surprise/blob/main/render.yaml):
   - **Name**: `birthday-surprise`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type / Plan**: `Free`

### Step 4: Deploy
1. Click **"Deploy Web Service"** at the bottom.
2. Render will build and start your application in ~1 minute.
3. You will get a free, live HTTPS URL (e.g. `https://birthday-surprise-xxxx.onrender.com`)! 🎉

---

## 🔗 Direct 1-Click Blueprint Deploy Link:
👉 **[Click Here to 1-Click Deploy on Render](https://render.com/deploy?repo=https://github.com/eugtemplado03-ui/birthday-surprise)**
