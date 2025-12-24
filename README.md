# IBuiltThis App

## Getting Started

First, run the development server:

```bash
    npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- Next.js: A React framework for building web applications.
- TypeScript : A strongly typed programming language that builds on JavaScript.
- Tailwind CSS : A utility-first CSS framework.
- Neon: A serverless Postgres database platform.
- Drizzle ORM : A type-safe ORM for TypeScript and JavaScript.
- Clerk : A user management and authentication service.
- Zod : A TypeScript-first schema declaration and validation library.

## Drizzle Commands

Apply the database schema changes by pushing them to the database with:

```bash
    npx drizzle-kit push
```

Alternatively, you can use the following commands for generating types and applying migrations.

```bash
    npx drizzle-kit generate
```

To apply database migrations, run:

```bash
    npx drizzle-kit migrate
```
