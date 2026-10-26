# Alina's Next Blog

A personal blog about web development built with **Next.js** and **TypeScript**. Posts are written as Markdown files and pre-rendered to static pages. The contact form saves messages to **MongoDB**.

## Features

- **Markdown posts.** Each post is a `.md` file with front matter (title, date, image, excerpt). There is no CMS or database for content.
- **Static generation (SSG + ISR).** All pages are generated at build time, and post pages are regenerated every 10 minutes.
- **Featured posts** on the home page, plus a full list sorted by date.
- **Syntax highlighting** for code blocks (`react-syntax-highlighter`, Prism, the `atomDark` theme).
- **Optimised images** through `next/image`.
- **Contact form** with validation, status notifications, and an API route that writes to MongoDB.
- **Strict TypeScript** and ESLint (`next/core-web-vitals`).

## Tech stack

| Area      | Tools                                          |
| --------- | ---------------------------------------------- |
| Framework | Next.js 14 (Pages Router), React 18            |
| Language  | TypeScript                                     |
| Content   | Markdown, `gray-matter`, `react-markdown`      |
| Styling   | CSS Modules                                    |
| Database  | MongoDB (`mongodb` driver)                     |
| Tooling   | ESLint                                         |

## Getting started

### Requirements

- Node.js 18.17 or newer
- A MongoDB database for the contact form, for example a free MongoDB Atlas cluster

### Installation

```bash
git clone https://github.com/alinahusak/next-js-full-blog.git
cd next-js-full-blog
npm install
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in your MongoDB connection string:

```bash
cp .env.example .env.local
```

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<database>
```

`.env.local` is in `.gitignore`, so never commit it. The blog itself works without this variable. Only sending the contact form needs it.

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create a production build            |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
├── components/
│   ├── contact/        # Contact form
│   ├── home-page/      # Hero and featured posts
│   ├── layout/         # Layout, navigation, logo
│   ├── posts/          # Post grid, post card, post detail
│   └── ui/             # Notification
├── lib/
│   └── posts-util.ts   # Reading and parsing Markdown posts
├── pages/
│   ├── api/contact.ts  # POST /api/contact, saves a message to MongoDB
│   ├── posts/
│   │   ├── index.tsx   # All posts
│   │   └── [slug].tsx  # Single post
│   ├── contact.tsx
│   └── index.tsx       # Home page
├── posts/              # Markdown posts
├── public/images/      # Site and post images
└── styles/             # Global styles
```

## Adding a post

1. Create a file in `posts/`. The file name becomes the URL slug, so `my-new-post.md` is served at `/posts/my-new-post`.
2. Add front matter at the top of the file:

   ```md
   ---
   title: "My New Post"
   date: "2026-10-26"
   image: my-new-post.png
   excerpt: A short description shown in the post list.
   isFeatured: true
   ---

   Post content in Markdown...
   ```

3. Put the images in `public/images/posts/my-new-post/`. Use the same folder name as the slug. The cover image should be 16:9.
4. To use an image inside the post, reference it by file name: `![Description](diagram.png)`.
5. Code blocks are highlighted when you set a language: ```` ```js ````. Supported languages are `js`, `jsx`, `ts`, `tsx`, `css`, `bash` and `json`. You can add more in `components/posts/post-detail/PostContent.tsx`.

## API

### `POST /api/contact`

Saves a message from the contact form.

```json
{
  "email": "user@example.com",
  "name": "Alina",
  "message": "Hello!"
}
```

| Status | Meaning                                         |
| ------ | ----------------------------------------------- |
| `201`  | Message saved                                   |
| `405`  | Method other than POST                          |
| `422`  | Invalid input (bad email or empty fields)       |
| `500`  | Database error or `MONGODB_URI` not set         |

## Deployment

The easiest option is [Vercel](https://vercel.com/new). Import the repository and add `MONGODB_URI` under **Settings → Environment Variables**. In MongoDB Atlas, allow connections from your hosting provider under **Network Access**.
