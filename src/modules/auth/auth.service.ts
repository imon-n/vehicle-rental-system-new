import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
const signupUser = async (payload: Record<string,any>)=>{
  const {name,email,password,role='customer',phone=""}=payload;
  const hashedPassword = await bcrypt.hash(password,10);
  const result = await pool.query(
    `insert into users(name,email,password,role,phone)
    values($1,$2,$3,$4,$5)
    returning id,name,email,phone,role`,
    [name,email.toLowerCase(),hashedPassword,role,phone]
    
  );
  return result.rows[0];
};
const signinUser= async (email: string, password: string) => {
  console.log({ email });
  const result = await pool.query(`SELECT id,name,email,phone,role,password FROM users WHERE email=$1`, [
    email,
  ]);


  console.log({ result });
  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);


  if (!match) {
    return false;
  }

  const token = jwt.sign(
    {  id: user.id, role: user.role },
    config.jwt_secret as string,
    {
      expiresIn: "7d",
    }
  );
  console.log({ token });

   const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};

export const authServices = {
 signupUser,
 signinUser,
};