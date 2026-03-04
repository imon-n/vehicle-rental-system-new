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
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)

---
