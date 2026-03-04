# Vehicle Rental System

A RESTful backend API for managing vehicle rentals, bookings, and users.

---

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access (Admin, Customer)

### Vehicles (Admin Only)
- Get all vehicles
- Add, update, and delete vehicles

### Bookings
- Create a booking
- Update booking status (cancel or return)
- Get all bookings (Admin) or own bookings (Customer)

### Users
- Delete a user (blocked if active bookings exist)

---

## Technology Stack
- **Backend:** Node.js, Express, TypeScript
- **Authentication:** JWT (JSON Web Tokens)

---

## Live Demo

Check out the live application here: [https://vercel-rental-system-new.vercel.app](https://vercel-rental-system-new.vercel.app)

---

## Important API Endpoints

### Auth
- `POST /api/v1/auth/register` – Register a new user
- `POST /api/v1/auth/login` – Login and get JWT

### Vehicles (Admin Only)
- `GET /api/v1/vehicles` – Get all vehicles
- `POST /api/v1/vehicles` – Add a vehicle
- `PUT /api/v1/vehicles/:id` – Update vehicle
- `DELETE /api/v1/vehicles/:id` – Delete vehicle

### Bookings
- `POST /api/v1/bookings` – Create a booking
- `PUT /api/v1/bookings/:bookingId` – Update booking status
- `GET /api/v1/bookings` – Get all bookings (Admin) or own bookings (Customer)

### Users
- `DELETE /api/v1/users/:id` – Delete a user (blocked if active bookings exist)
