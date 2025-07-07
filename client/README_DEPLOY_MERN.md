
# MERN Stack Deployment Guide (Vercel + Render)

This guide explains how to deploy your MERN (MongoDB, Express, React, Node.js) application with the following structure:

```
/MERN
  /backend   --> Node.js + Express API
  /frontend  --> React app
```

---

## 🌐 Frontend Deployment on Vercel

### ✅ Steps:
1. Push your code to GitHub.
2. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"New Project"**, then select your repository.
4. During setup:
   - **Root Directory**: `frontend`
   - **Framework**: React
   - **Environment Variables**: Add any required such as:
     ```
     REACT_APP_API_BASE=https://your-backend.onrender.com
     ```
5. Click **Deploy**.
6. Vercel will provide a public URL (e.g., `https://your-app.vercel.app`).

---

## 🚀 Backend Deployment on Render

### ✅ Steps:
1. Ensure your backend is in the `/backend` folder.
2. In `/backend/package.json`, make sure you have a start script:
   ```json
   "scripts": {
     "start": "node index.js"
   }
   ```
3. Go to [https://render.com](https://render.com) and sign in with GitHub.
4. Click **"New Web Service"**, then:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     ```
     PORT=10000
     MONGO_URI=your_mongodb_connection_string
     ```
5. Click **Deploy**.
6. Render will provide a backend URL (e.g., `https://your-backend.onrender.com`).

---

## 🔁 Connect Frontend and Backend

In your frontend React code, use `axios` or `fetch`:
```js
axios.post(`${process.env.REACT_APP_API_BASE}/api/cart`, payload);
```

For local development, add a proxy to `frontend/package.json`:
```json
"proxy": "http://localhost:10000"
```

---

## 🛡 Security Notes
- Never import backend files into frontend code.
- Always use environment variables for sensitive data.
- Enable CORS in your Express backend if needed:
```js
const cors = require('cors');
app.use(cors());
```

---

## 📦 Useful Commands

### In Backend
```bash
cd backend
npm install
npm start
```

### In Frontend
```bash
cd frontend
npm install
npm start
```

---

Happy Deploying! 🚀
