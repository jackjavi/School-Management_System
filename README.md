# Member Management System

![Member ManagementSystem Dashboard](http://res.cloudinary.com/popit/image/upload/v1734019995/wxwq6qczllwjlflx5nt4.png)

## Overview

This project is a **Full-Stack Member Management System** designed using the MERN stack. The system features:

- Secure user registration and login.
- CRUD operations on member profiles with associated roles.
- Profile picture uploads.
- A responsive user interface built with React and Tailwind CSS.
- A robust backend powered by Node.js, Express, and SQLite.
- Features like pagination, sorting, filtering, and a dashboard with statistical summaries.

## Features

- User Authentication:
  - Secure registration and login using JWT.
  - Pre-configured admin account.
- Member Management:
  - CRUD operations for member profiles.
  - Role-based access control.
  - Profile picture uploads.
- Dashboard:
  - Statistical summaries of users and activities.
  - Advanced filtering, sorting, and pagination.
- Backend:
  - SQLite database with normalized tables.
  - Predefined roles and activity logs seeded automatically.
- Frontend:
  - Responsive UI using React, Tailwind CSS, and React Router.
  - Protected routes with state management using Context API.

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/jackjavi/Member-Management_System.git
cd Member-Management_System
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables file:
   ```bash
   cp .env.example .env
   ```
4. Fill in the required environment variables in the `.env` file:

   - `JWT_SECRET` - Secret for signing JWT tokens.
   - `ADMIN_EMAIL` - Email for the default admin user.
   - `ADMIN_PASSWORD` - Password for the default admin user.

5. Run Sequelize migrations to set up the database:

   ```bash
   npx sequelize-cli db:migrate
   ```

6. Seed 50 test users and their associated actions:

   ```bash
   npm run seed
   ```

   **Note**: Raw passwords for seeded users will be logged in the console.

7. Start the backend server:
   ```bash
    npm start
   ```
   **Note**: The backend will run on `http://localhost:5000` by default.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables file:
   ```bash
   cp .env.example .env
   ```
4. Fill in the required environment variables in the `.env` file:

   - `REACT_APP_BACKEND_URL` - Backend API base URL (e.g., `http://localhost:5000`).

5. Start the development server:
   ```bash
   npm start
   ```
   **Note**: The frontend will run on `http://localhost:3000` by default.

---

## Usage

1. Log in using the admin credentials specified in the `.env` file.
2. Explore the dashboard to:
   - Manage members.
   - View activity logs.
   - Edit user roles, or delete members.
3. Use the seeded users to test features (raw passwords available in console after `npm run seed`).

---

## Technical Details

### Database

The system uses a normalized SQLite database with the following tables:

- **Users**: Stores user credentials and references roles.
- **Roles**: Predefined roles like "admin" and "user."
- **Members**: Stores member profiles associated with users.
- **Activity Logs**: Tracks CRUD operations linked to users.
- **User Activities**: Links users and activity logs.

### Relationships

- **User** has a one-to-many relationship with **Roles**.
- **User** has a one-to-one relationship with **Members**.
- **User** has a many-to-many relationship with **Activity Logs** via **User Activities**.

### Design Patterns

- **Separation of Concerns**: Distinct controllers for user, member, and activity operations.
- **Middleware**: JWT authentication middleware protects routes.
- **Normalization**: The database is normalized to 3NF to ensure minimal redundancy and optimal performance.

### Frontend

- Built with **React** and styled using **Tailwind CSS**.
- Navigation handled with **React Router**.
- State management using **Context API**.

### Backend

- Built with **Node.js** and **Express**.
- API endpoints secured with **JWT authentication**.
- Sequelize ORM for database interactions.

---

## Development Scripts

### Backend

- **Start server**:
  ```bash
  npm start
  ```
- **Run migrations**:
  ```bash
  npx sequelize-cli db:migrate
  ```
- **Undo migrations**:
  ```bash
  npx sequelize-cli db:migrate:undo
  ```
- **Seed database**:
  ```bash
  npm run seed
  ```

### Frontend

- **Start development server**:
  ```bash
  npm start
  ```
- **Build for production**:
  ```bash
  npm run build
  ```

---

## License

This project is licensed under the [MIT License](LICENSE).

---
