# 🔐 Secreto

### ✉️ Anonymous & Public Messaging Platform

Secreto is a messaging platform that allows users to send messages **anonymously** or **publicly**. Anonymous messages can only be viewed by the admin, while public messages are visible to everyone and open for comments from other users.

---

## 🚀 Features

- 🔒 **Send Anonymous Messages** — Users can send messages without revealing their identity. Only the admin can view the message content.
- 🌍 **Send Public Messages** — Public messages are visible to all users.
- 💬 **Comment on Public Messages** — Other users can leave comments on public messages.

---

## 🛠️ Tech Stack

| Layer | Technology | Documentation |
|---|---|---|
| ⚡ Framework | [Next.js](https://nextjs.org) | [nextjs.org/docs](https://nextjs.org/docs) |
| 📝 Language | [TypeScript](https://www.typescriptlang.org) | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| 🎨 Styling | [Tailwind CSS](https://tailwindcss.com) | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| 🧩 UI Components | [Shadcn UI](https://ui.shadcn.com) | [ui.shadcn.com/docs](https://ui.shadcn.com/docs) |
| 🐘 Database | [PostgreSQL](https://www.postgresql.org) | [postgresql.org/docs](https://www.postgresql.org/docs/) |
| 🔗 ORM | [Prisma](https://www.prisma.io) | [prisma.io/docs](https://www.prisma.io/docs) |
| 🍞 Runtime | [Bun](https://bun.sh) | [bun.sh/docs](https://bun.sh/docs) |

---

## 🗄️ Database Schema

Below is the Prisma schema used in this project:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../lib/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Message {
  id        String   @id @default(cuid())
  message   String

  isPrivate Boolean  @default(true)
  isAuthor  Boolean  @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  parentId  String?
  parent    Message?  @relation("MessageReplies", fields: [parentId], references: [id], onDelete: Cascade)

  replies   Message[] @relation("MessageReplies")
}
```

### 📋 Schema Overview

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique identifier for each message (auto-generated cuid) |
| `message` | String | The content of the message |
| `isPrivate` | Boolean | If `true`, only admin can view. If `false`, visible to everyone (default: `true`) |
| `isAuthor` | Boolean | Indicates whether the sender is the author/admin (default: `false`) |
| `createdAt` | DateTime | Timestamp when the message was created (auto-generated) |
| `updatedAt` | DateTime | Timestamp when the message was last updated (auto-updated) |
| `parentId` | String? | Optional reference to a parent message (used for replies) |
| `parent` | Message? | Relation to the parent message |
| `replies` | Message[] | List of reply messages under this message |

---

## 📦 Getting Started

### ✅ Prerequisites

Make sure you have the following installed on your machine:

- 🍞 [Bun](https://bun.sh) (v1.0 or higher)
- 🐘 [PostgreSQL](https://www.postgresql.org/download/) (database)

### 📥 Clone Repository

```bash
git clone https://github.com/untgbdmnio/secreto.git
cd secreto
```

### 📚 Install Dependencies

```bash
bun install
```

### ⚙️ Setup Environment Variables

Create a `.env` file in the root of the project and fill in your database configuration:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
POSTGRES_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PRISMA_DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

> ⚠️ Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your actual PostgreSQL credentials.

### 🔄 Run Database Migration

Generate the Prisma client and run the migration:

```bash
bunx prisma migrate dev
```

Then generate the Prisma client:

```bash
bunx prisma generate
```

### 🏃‍♂️ Run Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. 🎉

---

## 🌐 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel](https://vercel.com) platform. ☁️

Check out the [📖 Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📄 License

Distributed under the MIT License. 📝

---

<p align="center">Made with ❤️ by <a href="https://github.com/untgbdmnio">untgbdmnio</a></p>
