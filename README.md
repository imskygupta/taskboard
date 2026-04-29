# TASK·BOARD

A minimal, high-performance task management application built as a full-stack assessment submission. The goal of this project is to deliver a robust, secure, and visually polished experience while strictly adhering to the assessment requirements.

## Live Demo
**[taskboard-mu-nine.vercel.app](https://taskboard-mu-nine.vercel.app)**

---

## Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Styling**: Tailwind CSS + Custom CSS Variables for Glassmorphism
- **Animations**: GSAP
- **Authentication**: Custom JWT implementation (using `jose`), Bcryptjs password hashing, HTTP-only cookies
- **Validation**: Zod (Server-side & Action validation)

---

## Features

1. **Custom Authentication**
   - Secure sign-up and login flow.
   - Passwords hashed via `bcryptjs` before storage.
   - Sessions managed via stateless JWTs securely stored in `HttpOnly`, `Secure` cookies.
   - Includes a 1-click "Demo Login" for reviewers.

2. **Task Management (Kanban Style)**
   - 3 rigid statuses: `Todo`, `In Progress`, `Done` (per assessment restrictions).
   - "Yours, scoped to you": Users can only view and mutate tasks they created, enforced via relational foreign keys.
   - Fast optimistic UI patterns using Next.js Server Actions.

3. **Premium UI/UX**
   - Custom design system utilizing CSS variables for consistent glassmorphism and holographic gradients.
   - GSAP-powered micro-interactions (e.g., floating "graffiti" XP popups) for a gamified feel.

---

## Local Setup

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/imskygupta/taskboard.git
   cd taskboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET_KEY="your_super_secret_key"
   ```

4. **Initialize Database:**
   Push the Prisma schema to your database.
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

This application is configured for deployment on Vercel. 
Ensure that `DATABASE_URL` and `JWT_SECRET_KEY` are configured in your Vercel Environment Variables before deploying. A `postinstall` script (`prisma generate`) is included to ensure the Prisma client builds correctly in the Vercel serverless environment.

---
*Built for the Digitally Next assessment review.*
