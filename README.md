# Pitch Polisher

Pitch Polisher is a streamlined web application designed to help users quickly write, edit, and organize their startup or product pitches. Built for a fast, modern experience, it ensures you have all your pitches in one secure place.

## Core Screens

1. **Login/Signup (`/login`)**: A simple authentication screen to secure user data.
2. **Dashboard (`/`)**: The main overview showing Total Pitches, Recent Pitches, Today's Activity, and a Quick Create button.
3. **Pitch List (`/pitches`)**: A comprehensive list of all your pitches.
4. **Pitch Editor (`/pitches/new` & `/pitches/[id]`)**: The interface for creating a new pitch or updating an existing one.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Vanilla CSS Modules (Modern Dark Theme with Blue & Purple accents)
- **Database**: SQLite
- **Authentication**: Cookie-based sessions (Iron Session)
- **Deployment**: Docker-ready

## Local Development

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

A standard Dockerfile is included. You can build and run the application via Docker:

```bash
docker build -t pitch-polisher .
docker run -p 3000:3000 pitch-polisher
```
