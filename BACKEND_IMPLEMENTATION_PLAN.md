# Backend Implementation Plan: LK-HUB on Hostinger

This document outlines the roadmap for migrating the LK-HUB website from a prototype file-based system to a robust production architecture using **Next.js**, **MySQL**, **Prisma ORM**, and **NextAuth.js**, fully compatible with Hostinger's Business Web Hosting.

---

## 🏗️ 1. Architecture Overview

- **Framework**: Next.js 14+ (App Router)
- **Database**: MySQL (Hosted on Hostinger)
- **ORM**: Prisma (For type-safe database interactions and migrations)
- **Authentication**: NextAuth.js (v5) (Secure credentials login & session management)
- **Media Storage**: Local filesystem (`public/uploads`) served efficiently.

---

## 🗄️ 2. Database Schema Design (Prisma)

We will define our database models in `schema.prisma`.

### Key Models:
1.  **User**: Admins and Editors with role-based access.
2.  **Project**: The main content items (Divisions/Programs).
3.  **NewsPost**: Blog posts, press releases, and updates.
4.  **JobOpening**: Career opportunities and applications.
5.  **Media**: Centralized media library tracking.

**Proposed `schema.prisma`:**
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  SUPER_ADMIN
  ADMIN
  EDITOR
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  password  String   // Hashed
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Project {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  division    String   // e.g., "rk-education"
  description String   @db.Text
  content     String   @db.LongText
  coverImage  String?
  tags        String?  // JSON string or relation
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model NewsPost {
  id        String   @id @default(uuid())
  title     String
  slug      String   @unique
  summary   String?  @db.Text
  content   String   @db.LongText
  status    String   @default("DRAFT") // DRAFT, PUBLISHED
  publishedAt DateTime?
  authorId  String?
  coverImage String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model JobOpening {
  id          String   @id @default(uuid())
  title       String
  location    String
  type        String   // Full-time, Part-time
  description String   @db.Text
  requirements String? @db.Text
  status      String   @default("OPEN")
  applicants  Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 🔐 3. Authentication Implementation

We will replace the current file-based `/src/lib/auth.js` with **NextAuth.js**.

**Steps:**
1.  Install packages: `npm install next-auth@beta @auth/prisma-adapter bcryptjs`
2.  Configure `auth.config.ts`:
    *   Use `CredentialsProvider`.
    *   Verify email/password against the `User` table using Prisma.
    *   Use `bcryptjs` to compare hashed passwords.
3.  Protect Admin Routes:
    *   Update `middleware.ts` to check for valid sessions on `/admin/*` routes.

---

## 📂 4. File Upload Strategy

Since we are on a VPS/Hosting environment (Hostinger), we can store files locally.

**Approach:**
1.  **Storage Location**: `public/uploads/` (Accessible via URL).
2.  **Upload Logic**:
    *   Create an API route `/api/upload` (using `formidable` or `node:fs`).
    *   Generate unique filenames (e.g., `uuid-filename.jpg`).
    *   Save files to `public/uploads/YYYY/MM/`.
    *   Return the public URL (e.g., `/uploads/2025/02/image.jpg`) to save in the database.

---

## 🚀 5. Implementation Roadmap

### Phase 1: Database Setup
1.  **Hostinger**: Create a new MySQL Database in Hostinger Dashboard.
2.  **Env**: Update `.env` locally with the connection string.
3.  **Prisma**: Run `npx prisma init` and define the schema.
4.  **Push**: Run `npx prisma db push` to sync schema with Hostinger DB.

### Phase 2: data Migration
1.  **Seed Script**: Write a script `prisma/seed.js` to read the existing `src/data/*.json` files.
2.  **Import**: Run the script to populate the MySQL database with your current content (Projects, News, etc.).

### Phase 3: Backend Logic Replacement
1.  **Refactor Actions**: Rewrite `app/actions/*.js` (projects.js, news.js) to use `prisma.project.findMany()` instead of `fs.readFileSync`.
2.  **Refactor Auth**: Replace `getUsers()` with database lookups.

### Phase 4: Production Deployment
1.  **Build**: Run `npm run build`.
2.  **Deploy**: Upload the `.next`, `public`, `package.json`, `prisma`, and `server.js` folders/files to Hostinger.
3.  **Install**: Run `npm install --production` on Hostinger (via SSH or Node.js App manager).
4.  **Start**: Ensure the Node.js App is pointing to `server.js` or `npm start`.

---

## 🛠️ Required Commands Checklist

```bash
# 1. Install Dependencies
npm install prisma @prisma/client next-auth@beta bcryptjs

# 2. Initialize Prisma
npx prisma init

# 3. Generate Client (Run after schema changes)
npx prisma generate

# 4. Push Schema to DB
npx prisma db push
```

---

## ⚠️ Important Considerations for Hostinger
*   **Database Connection**: Ensure your `.env` `DATABASE_URL` is correct. Hostinger uses `localhost` as host if Node.js app is on the same server, or the specific IP.
*   **Persistent Storage**: Ensure `public/uploads` is effectively persistent and not overwritten by deployments (use distinct folders).
*   **Build Process**: You might need to build locally and upload `.next` folder if Hostinger's build resources are limited.
