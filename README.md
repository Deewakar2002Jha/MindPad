# Full-Stack Notes Application

This is a comprehensive full-stack Notes App with an Administrative panel built dynamically.

## 🛠 Tech Stack
- **Frontend:** React + Vite, Axios, React Router
- **Backend:** Node.js, Express, Mongoose (MongoDB Atlas)
- **Auth:** Powered strictly by `@clerk/express` and `@clerk/react`

## 🚀 Setup Instructions

1. **Clone this repository.** Make sure `node` is installed natively on your OS.
2. **Setup the Backend:**
    - Open your terminal and `cd backend`
    - Run `npm install` to gather the `node_modules` automatically.
    - Create a `.env` file referencing your MongoDB URI and Clerk Backend (`SECRET_KEY`, `PUBLISHABLE_KEY`).
    - Boot locally using `npm run dev`.
3. **Setup the Frontend:**
    - Open a secondary terminal specifically and `cd frontend`
    - Run `npm install` automatically generating its own distinct `node_modules`.
    - Create a `.env` exposing `VITE_CLERK_PUBLISHABLE_KEY` and your backend host url (`VITE_API_URL=http://localhost:5000`).
    - Boot the frontend using `npm run dev`.

---

### Note on GitHub Tracking (`.gitignore`)
The `.gitignore` physically prevents gigantic `node_modules` folders from being tracked by git commands, keeping the source code light and pushing exceptionally fast without overwhelming GitHub's internal limits! Similarly, your local `.env` secure files are also permanently shielded to prevent unintentional leaks of valid passwords or token parameters to the public.
