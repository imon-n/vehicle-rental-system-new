# Vehicle Rental System API



A RESTful backend API for managing vehicle rentals, bookings, and users.  
Built with **Node.js, Express, TypeScript, and PostgreSQL** with JWT authentication and role-based access.

---

##  Live Demo

- Live Server: [https://your-live-url.com](https://vercel-rental-system-new.vercel.app/)  
 

*(Replace with your deployed URL)*

---

##  Features

###  Authentication & Authorization
- User Registration & Login
- JWT-based Authentication
- Role-Based Access Control (Admin & Customer)
- Protected Routes

###  User Management
- Create and Delete Users
- Prevent deletion if user has active bookings

###  Vehicle Management (Admin)
- Add, Update, Delete Vehicles
- View All Vehicles
- Automatic Availability Status Updates

###  Booking Management
- Create Bookings
- Cancel Bookings (Customer)
- Mark Bookings as Returned (Admin)
- Automatic Vehicle Availability Update
- Automatic Price Calculation  

**Price Formula:**  
`total_price = daily_rent_price × number_of_days`  
`number_of_days = rent_end_date - rent_start_date`

---

##  Technology Stack

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** PostgreSQL  
- **Authentication:** JWT, Bcrypt  
- **Environment:** dotenv  
- **Database Client:** pg  

---



##  Important API Endpoints

###  Authentication
- **POST** `/api/v1/auth/register` – Register a new user  
- **POST** `/api/v1/auth/login` – Login and get JWT  

**Header for protected routes:**  


---

###  Vehicles (Admin Only)
- **GET** `/api/v1/vehicles` – Get all vehicles  
- **POST** `/api/v1/vehicles` – Add a vehicle  
- **PUT** `/api/v1/vehicles/:id` – Update vehicle  
- **DELETE** `/api/v1/vehicles/:id` – Delete vehicle  

---

###  Bookings
- **POST** `/api/v1/bookings` – Create a booking  
- **PUT** `/api/v1/bookings/:bookingId` – Update booking status  
- **GET** `/api/v1/bookings` – Get all bookings (Admin) or own bookings (Customer)  

---

###  Users
- **DELETE** `/api/v1/users/:id` – Delete a user (blocked if active bookings exist)
