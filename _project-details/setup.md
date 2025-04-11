# StudySync – Developer Setup Guide

This guide helps you get StudySync running on your local machine for development. It assumes you're using a Linux-based environment (WSL2 or macOS terminal).

---

## Prerequisites

Make sure the following tools are installed:

### Node.js (v18.x recommended)

If you use `nvm` (recommended):

```bash
nvm install 18
nvm use 18
```

### Ruby (v3.1.1)

Use a version manager like rbenv or rvm:

```bash
rbenv install 3.1.1
rbenv global 3.1.1
```

### PostgreSQL

```bash
sudo -u postgres createuser --superuser $USER
createdb react_on_rails_dev
createdb react_on_rails_test
```

---

## Clone the Repo

```bash
git clone git@github.com:ArcaneCipher/StudySync.git
cd StudySync
```

---

## Environment Setup

There is an `.env.example` file in the client and server directories. These can be copied and renamed `.env`. You'll put all your credential information like the psql username/password in those files.

1. Client .env file

   - Create a file at client/.env:

```bash
# .env (client side - gitignored)
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=ReactOnRails
```

2. Server .env file

    - Create a file at server/.env:

```bash
# ======================================
# DATABASE CONFIGURATION
# ======================================

# Development database name
# Used when running `rails s` or working locally in development mode
DATABASE_NAME_DEVELOPMENT=react_on_rails_dev

# Test database name
# Used when running tests (e.g., `rails test` or `rspec`)
DATABASE_NAME_TEST=react_on_rails_test

# Production database name
# Only required if you plan to run the app in production locally or deploy it
DATABASE_NAME_PRODUCTION=react_on_rails_prod

# PostgreSQL username
# Set this to the name of your local or remote Postgres user
DB_USERNAME=[Insert DEVELOPTMENT username]

# PostgreSQL password
# Password for the above DB_USERNAME
DB_PASSWORD=[Insert DEVELOPTMENT password]

# Database host
# Typically 'localhost' for local development
DB_HOST=localhost

# Optional: Postgres port
# Default is 5432 — uncomment and adjust if needed
# DB_PORT=5432

# Optional: Use SSL connection for Postgres
# Typically used in production or when connecting to cloud-hosted DBs
# DB_SSL=true
```

These two `.env` files are ignored when you push changes to github. The `server/config/database.yml` file is going to grab the environment settings from your `server/.env` file.

---

## Install Dependencies

Client (React + Vite)

```bash
cd client
npm install
```

Server (Rails API)

```bash
cd ../server
./bin/setup
```

This will:

- Install gems

- Prepare the database (create, migrate, seed if needed)

- Clear logs/tempfiles

- Restart the Rails app

---

## Start the App

You'll need two terminal windows/tabs:

### Terminal 1 – Start Rails API

```bash
cd server rails s
```

### Terminal 2 – Start Vite Client

```bash
cd client npm run dev
```

---

## Run Tests (not implemented yet)

To run backend tests:

```bash
cd server rails test
```

To run frontend tests (if configured):

```bash
cd client npm run test
```

---

## Common Issues

- **Node version mismatch**: Make sure you're using Node v18 (`nvm use 18`)

- **Postgres permission errors**: Confirm your user has proper access, or use `psql` to test connectivity.

- **Port conflicts**: Ensure ports `3000` (Rails) and `5173` (Vite) are free.

---

## Extra Notes

- The `server/config/database.yml` uses values from your `.env` file for all DB configs.

- Both `.env` files are `.gitignore`d — no secrets should be committed.

---
