# Vehicle Rental System API

[!(https://img.shields.io/badge/Node.js-14.x-green)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Express.js-4.x-blue)](https://expressjs.com/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blueviolet)](https://www.typescriptlang.org/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue)](https://www.postgresql.org/)

A RESTful backend API for managing vehicle rentals, bookings, and users.  
Built with **Node.js, Express, TypeScript, and PostgreSQL** with JWT authentication and role-based access.

---

## 🌐 Live Demo

- Live Server: [https://your-live-url.com](https://your-live-url.com)  
- API Base URL: [https://your-live-url.com/api/v1](https://your-live-url.com/api/v1)  

*(Replace with your deployed URL)*

---

## 📌 Features

### 🔐 Authentication & Authorization
- User Registration & Login
- JWT-based Authentication
- Role-Based Access Control (Admin & Customer)
- Protected Routes

### 👤 User Management
- Create and Delete Users
- Prevent deletion if user has active bookings

### 🚘 Vehicle Management (Admin)
- Add, Update, Delete Vehicles
- View All Vehicles
- Automatic Availability Status Updates

### 📅 Booking Management
- Create Bookings
- Cancel Bookings (Customer)
- Mark Bookings as Returned (Admin)
- Automatic Vehicle Availability Update
- Automatic Price Calculation  

**Price Formula:**  
`total_price = daily_rent_price × number_of_days`  
`number_of_days = rent_end_date - rent_start_date`

---

## 🛠 Technology Stack

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** PostgreSQL  
- **Authentication:** JWT, Bcrypt  
- **Environment:** dotenv  
- **Database Client:** pg  

---

## 📁 Project Structure
src/
├── controllers/
├── services/
├── routes/
├── middleware/
├── config/
└── server.ts

## 📮 Important API Endpoints

### 🔑 Authentication
- **POST** `/api/v1/auth/register` – Register a new user  
- **POST** `/api/v1/auth/login` – Login and get JWT  

**Header for protected routes:**  


---

### 🚘 Vehicles (Admin Only)
- **GET** `/api/v1/vehicles` – Get all vehicles  
- **POST** `/api/v1/vehicles` – Add a vehicle  
- **PUT** `/api/v1/vehicles/:id` – Update vehicle  
- **DELETE** `/api/v1/vehicles/:id` – Delete vehicle  

---

### 📅 Bookings
- **POST** `/api/v1/bookings` – Create a booking  
- **PUT** `/api/v1/bookings/:bookingId` – Update booking status  
- **GET** `/api/v1/bookings` – Get all bookings (Admin) or own bookings (Customer)  

---

### 👤 Users
- **DELETE** `/api/v1/users/:id` – Delete a user (blocked if active bookings exist)
