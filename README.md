# Full Todo

A modern task management app built with Next.js and React. It includes authentication, a dashboard, task operations, and a responsive UI for managing daily work.

## Overview

This project is designed to help users:

- Create new tasks
- Edit and delete existing tasks
- Toggle task completion state
- View and filter tasks from the dashboard
- Sign in or register through dedicated auth pages
- Manage their workspace with a clean interface

## Tech Stack

- Frontend: Next.js
- UI Library: React
- Styling: CSS and Tailwind CSS
- Animation: Motion library
- Icons: Lucide React

## Features

- User authentication flow with login and registration pages
- Protected dashboard view for authenticated users
- Add, update, and remove todo items
- Responsive layout for desktop and mobile screens
- Modal-based task creation and update flows
- Pagination support on task lists
- Clean landing page and navigation

## Project Structure

```bash
full-todo/
├── app/
│   ├── login/
│   │   └── page.js
│   ├── register/
│   │   └── page.js
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── AuthGate.jsx
│   ├── ConfirmModal.jsx
│   ├── Dashboard.jsx
│   ├── Landing.jsx
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   ├── TaskCard.jsx
│   ├── TaskModal.jsx
│   └── TodoApp.jsx
├── context/
│   └── AuthContext.jsx
├── lib/
│   ├── api.js
│   ├── auth.js
│   └── tasks.js
├── public/
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
└── .gitignore
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ahmedtalaat-dev/fullstack-todo-app
```

```bash
cd full-todo
```

2. Install dependencies:

```bash
npm install
```

## Running the App

Start the development server:

```bash
npm run dev
```

Then open the app in your browser at:

```text
http://localhost:3000
```
