<div align="center">

# iampaulpop

**Personal portfolio website — built with React, TypeScript, Vite & shadcn/ui**

[![TypeScript](https://img.shields.io/badge/TypeScript-93%25-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-latest-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-blazing%20fast-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-components-000000?style=flat-square)](https://ui.shadcn.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

---

## Overview

`iampaulpop` is a personal portfolio website for Paul Pop — a modern, fast, and fully type-safe single-page application. It serves as a central hub to showcase projects, skills, and contact information. The stack prioritises developer experience and production performance.

---

## Tech Stack

| Layer           | Technology                                    |
| --------------- | --------------------------------------------- |
| Framework       | [React](https://react.dev/)                   |
| Language        | [TypeScript](https://www.typescriptlang.org/) |
| Build tool      | [Vite](https://vitejs.dev/)                   |
| UI components   | [shadcn/ui](https://ui.shadcn.com/)           |
| Styling         | CSS / Tailwind (via shadcn)                   |
| Package manager | [Yarn Berry](https://yarnpkg.com/)            |
| Linting         | [ESLint](https://eslint.org/)                 |
| Formatting      | [Prettier](https://prettier.io/)              |
| Git hooks       | [Husky](https://typicode.github.io/husky/)    |
| Deployment      | [Vercel](https://vercel.com/)                 |

---

## Getting Started

### Prerequisites

- Node.js `>=18`
- Yarn `>=4` (Berry)

### Installation

```bash
# Clone the repository
git clone https://github.com/MIKALAKE/iampaulpop.git
cd iampaulpop

# Install dependencies
yarn install
```

### Development

```bash
yarn dev
```

The dev server starts at `http://localhost:5173` with HMR enabled.

### Build

```bash
yarn build
```

The production bundle is output to `dist/`.

### Preview production build

```bash
yarn preview
```

---

## Project Structure

```
iampaulpop/
├── public/             # Static assets (favicon, images, etc.)
├── src/                # Application source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components / routes
│   └── ...
├── .husky/             # Git hooks (pre-commit lint & format)
├── components.json     # shadcn/ui component configuration
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── vercel.json         # Vercel deployment configuration
└── package.json
```

---

## Code Quality

This project enforces consistent code quality through automated tooling:

- **ESLint** — catches bugs and enforces code conventions
- **Prettier** — ensures uniform formatting across all files
- **Husky** — runs lint and format checks automatically on every commit via pre-commit hooks

To run checks manually:

```bash
# Lint
yarn lint

# Format
yarn format
```

---

## Deployment

The project is deployed automatically to **Vercel**. Every push to the `staging` branch triggers a new deployment preview. Production deployments are managed through the Vercel dashboard.

Deployment configuration lives in [`vercel.json`](./vercel.json).

---

## Branch Strategy

| Branch                | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| `staging`             | Default branch — active development & previews |
| `main` / `production` | Stable production releases                     |

---

## License

This project is personal and not licensed for reuse. All content and design are the intellectual property of **Paul Pop**.

---

<div align="center">
  Made with ☕ by <a href="https://github.com/MIKALAKE">MIKALAKE</a>
</div>
