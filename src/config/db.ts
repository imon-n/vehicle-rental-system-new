
import { Pool } from "pg";
import conver from ".";



//DB
export const pool = new Pool({
  connectionString: `${conver.connection_str}`,
});

const initDB = async () => {
await pool.query(
  `
  CREATE TABLE IF NOT EXISTS  users(
  id  SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone  TEXT NOT NULL,
  role  VARCHAR(20) NOT NULL CHECK(role IN('admin','customer')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
  )
  `
);


await pool.query(
  `
  CREATE TABLE IF NOT EXISTS  vehicles(
  id  SERIAL PRIMARY KEY,
  vehicle_name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('car','bike','van','SUV')),
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  daily_rent_price NUMERIC CHECK (daily_rent_price>0) NOT NULL,
  availability_status VARCHAR(20) NOT NULL CHECK(availability_status IN('available','booked')) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
  )
  `
);

await pool.query(
  `
  CREATE TABLE IF NOT EXISTS bookings (
  id  SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
      rent_start_date DATE NOT NULL,
      rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
      total_price NUMERIC NOT NULL CHECK (total_price > 0),
      status VARCHAR(20) NOT NULL 
        CHECK (status IN ('active','cancelled','returned')) 
        DEFAULT 'active',

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
  )
  `
);


};



export default initDB;