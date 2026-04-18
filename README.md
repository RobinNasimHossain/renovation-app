# Renovation App

A full-stack MERN application for a home-renovation services company. Visitors can
browse services, view a portfolio of completed projects, and submit booking/quote
requests. Admins can sign in to manage services, projects, and incoming bookings.

## Stack

- **MongoDB** via Mongoose
- **Express** REST API with JWT auth
- **React 18** + **Vite** + **Tailwind CSS** SPA
- **Node.js** 20+

## Project Layout

```
renovation-app/
├── client/        # React + Vite frontend
├── server/        # Express + Mongoose backend
└── README.md
```

## Quick Start

### 1. Install dependencies

```bash
# from repo root
cd server && npm install
cd ../client && npm install
```

### 2. Configure environment

Copy the server example env file and fill in the values:

```bash
cp server/.env.example server/.env
```

`server/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/renovation-app
JWT_SECRET=change-me-in-production
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Seed the database (optional)

```bash
cd server
npm run seed
```

This creates an admin user (`admin@renovation.local` / `admin1234`), a set of
services, and a project portfolio.

### 4. Run the apps

In two terminals:

```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

The client runs at http://localhost:5173 and proxies `/api` to the server at
http://localhost:5000.

## API Overview

| Method | Path                     | Auth    | Description                          |
| ------ | ------------------------ | ------- | ------------------------------------ |
| POST   | `/api/auth/register`     | public  | Register a new user (admins seeded)  |
| POST   | `/api/auth/login`        | public  | Login, returns JWT                   |
| GET    | `/api/auth/me`           | user    | Current user profile                 |
| GET    | `/api/services`          | public  | List services                        |
| POST   | `/api/services`          | admin   | Create a service                     |
| PUT    | `/api/services/:id`      | admin   | Update a service                     |
| DELETE | `/api/services/:id`      | admin   | Delete a service                     |
| GET    | `/api/projects`          | public  | List portfolio projects              |
| POST   | `/api/projects`          | admin   | Create a project                     |
| PUT    | `/api/projects/:id`      | admin   | Update a project                     |
| DELETE | `/api/projects/:id`      | admin   | Delete a project                     |
| POST   | `/api/bookings`          | public  | Submit a quote/booking request       |
| GET    | `/api/bookings`          | admin   | List bookings                        |
| PATCH  | `/api/bookings/:id`      | admin   | Update booking status                |

## Scripts

### server

- `npm run dev` — start with nodemon
- `npm start` — start in production mode
- `npm run lint` — lint backend
- `npm run seed` — seed MongoDB with demo data

### client

- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run preview` — preview a production build
- `npm run lint` — ESLint

## License

MIT
