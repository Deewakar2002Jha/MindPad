# 📓 MindPad — Digital Vellum Note-Taking

MindPad is a premium, feature-rich note-taking application designed with a **"Digital Vellum"** aesthetic. It combines a seamless editorial experience for users with a powerful administrative console for management.

---

## 🚀 Technologies Used

### **Frontend**
*   **⚛️ React & Vite** — Lightning-fast development and optimized bundles.
*   **🛡️ Clerk Auth** — Enterprise-grade user authentication and management.
*   **✨ Lucide React** — Beautiful, consistent iconography.
*   **🔥 React Hot Toast** — Elegant, non-intrusive notifications.
*   **🎨 Vanilla CSS** — Custom-crafted "Digital Vellum" design system.

### **Backend**
*   **🟢 Node.js & Express** — High-performance server architecture.
*   **🍃 MongoDB & Mongoose** — Flexible, scalable document storage.
*   **🔑 JWT & Bcryptjs** — Secure database-backed administrative authentication.
*   **✅ @clerk/express** — Seamless integration with the authentication provider.

### **Infrastructure**
*   **📐 Vercel** — Unified monorepo deployment with Serverless Functions.
*   **☁️ MongoDB Atlas** — Cloud-native database hosting.

---

## 🛠️ Getting Started

### **1. Clone & Install**
```bash
git clone https://github.com/Deewakar2002Jha/MindPad.git
cd MindPad
npm install
```

### **2. Setup Environment Variables**
Create `.env` files in both the `frontend` and `backend` directories:

**`backend/.env`**
```env
MONGO_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_secret_key
JWT_SECRET=your_custom_secret
ADMIN_EMAIL=admin@mindpad.app
ADMIN_PASSWORD=admin123
```

**`frontend/.env`**
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=/api
```

### **3. Run Locally**
Open two terminals:

**Terminal 1 (Backend)**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend)**
```bash
cd frontend
npm install
npm run dev
```

---

## 🚢 Deployment (Vercel)

This project is configured as a **Monorepo** for Vercel.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Vercel will automatically use the `vercel.json` configuration:
    *   **Build Command**: `cd frontend && npm install && npm run build`
    *   **Output Directory**: `frontend/dist`
4.  Add all environment variables to the Vercel Dashboard.

---

## 🏗️ Core Features
-   **✨ Editorial UI**: A clean, paper-like writing environment.
-   **🔍 Global Search**: Instant filtering of notes by title.
-   **🛡️ Admin Panel**: Secure, separate login for managing users and platform health.
-   **📱 Responsive Design**: Seamless experience across mobile and desktop.

---

## 📄 License
This project is licensed under the **ISC License**.
