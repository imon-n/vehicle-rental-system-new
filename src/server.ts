import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger"
import { userRoutes } from "./modules/users/users.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import vehicleRoutes from "./modules/vehicle/vehicle.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";
const app = express()
const port = config.port;



initDB()


app.use(express.json())
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

//users CRUD
//users CRUD
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});
// users Crud

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
