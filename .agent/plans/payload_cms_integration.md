# Implementation Plan: PayloadCMS Integration for LK Site

This plan outlines the steps to integrate **PayloadCMS 3.0 (Beta)** directly into your existing Next.js application. This will transform your static "Divisions" data into a dynamic, secure Content Management System (CMS).

## 1. Prerequisites & Database Setup
Payload requires a database. **MongoDB** is highly recommended for this project because your "Divisions" data (`divisionsContent.js`) is highly nested (arrays of objects, variable structures), which maps perfectly to MongoDB documents. Postgres is an option but requires more strict schema definitions.

*   **Action**: Create a free MongoDB Atlas account (cloud) or install MongoDB Community Server locally.
*   **Result**: Connection string (e.g., `mongodb+srv://...`).

## 2. Installation (Payload 3.0 - Native Next.js)
We will install the Payload 3.0 packages which run natively within the Next.js App Router.

*   **Command**: 
    ```bash
    npm install payload@beta @payloadcms/next@beta @payloadcms/db-mongodb@beta @payloadcms/richtext-lexical@beta graphql sharp
    ```
*   **Env Vars**: Create `.env` file with:
    ```
    DATABASE_URI=your_mongodb_connection_string
    PAYLOAD_SECRET=super_long_random_string_for_security
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
    ```

## 3. Configuration & Structure
We need to set up the Payload configuration file that defines your CMS structure.

*   **Create File**: `payload.config.ts` (root directory).
*   **Content**: Initialize with MongoDB adapter and Lexical editor.

## 4. Schema Definition: `Divisions` Collection
This is the most critical step. We need to translate your `src/data/divisionsContent.js` into a Payload Collection Config.

*   **File Location**: `src/collections/Divisions.ts`
*   **Fields Mapping**:
    *   `slug` (Text, Unique, Required) - e.g., "lk-solutions"
    *   `title` (Text)
    *   `hero` (Group):
        *   `image` (Upload - Relationship to Media collection)
        *   `visualType` (Select: 'hexagon', 'ball', 'blob', 'rings', 'pulse')
        *   `bullets` (Array of Text)
    *   `theme` (Group):
        *   `heroClass`, `btnPrimaryClass`, etc. (Text fields)
    *   `content` (Tabs/Groups):
        *   `about` (RichText or Text Area)
        *   `vision` & `mission` (Text Areas)
    *   `pillars` (Array):
        *   `title`, `icon`, `content`, `audience` (Array)

*   **Media Collection**: We also need a `Media` collection to handle image uploads securely.

## 5. App Router Integration
Payload 3.0 lives inside your `app` directory.

*   **Admin Route**: Create `app/(payload)/admin/[[...segments]]/page.tsx`
*   **GraphQL/API Route**: Create `app/(payload)/api/[...slug]/route.ts`
*   **Config**: Update `next.config.mjs` to allow Payload hooks.

## 6. Migration Script (Seed Data)
Instead of manually typing all your existing data into the CMS, we will write a "Seed Script".

*   **Script**: `src/scripts/seed.ts`
*   **Logic**: Reads your existing `divisionsContent.js` and inserts it into the Database via Payload's Local API.

## 7. Frontend Integration (Refactoring Pages)
Once the CMS is running and populated, we switch the frontend to consume data from the DB instead of the file.

*   **Action**: Create a utility `src/lib/payload.ts` to get a secure Local API client.
*   **Refactor**: Update `app/divisions/[slug]/page.js` to:
    1.  Accept the `params` (slug).
    2.  Fetch data: `payload.find({ collection: 'divisions', where: { slug: { equals: slug } } })`.
    3.  Pass the result to `DivisionTemplate`.

## 8. Security Check
*   **Access Control**: Ensure only you (the admin) can write data. Frontend only needs 'read' access.
*   **Authentication**: Setup the first Admin User.

---

## Next Steps to Start
1.  **Do you have a MongoDB connection string ready?** (Local or Atlas)
2.  **Approve dependencies installation.**
