import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (payload: Record<string, unknown>) => {
  const { name,  email, password,role = "customer",phone="" } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name,  email, password,role,phone) VALUES($1, $2, $3, $4,$5) RETURNING id , name, email,role,phone,created_at`,
    [name,  email, hashedPass,role,phone]
  );

  return result.rows[0];
};

const getUser = async () => {
  const result = await pool.query(`SELECT id,name,email,role,phone,created_at FROM users`);
  return result.rows;
};
const updateUser = async(userId:number,payload:any)=>{
  const fields:string[]=[];
  const values:any[]=[];
  let index = 1 ;
  for (const key in payload){
    if(key === "password"){
      payload[key] = await bcrypt.hash(payload[key],10);
    }
    fields.push(`${key}=$${index}`);
    values.push(payload[key]);
    index++;
  }

  values.push(userId);
  const result = await pool.query(
    `
    update users set ${fields.join(",")},updated_at=NOW()
    where id= $${index}
    returning id,name,email,role,phone,updated_at`,
    values

  );
  return result.rows[0];
}

const deleteUser = async(userId:number)=>{
  const bookingCheck = await pool.query(
    `select count(*) from bookings where customer_id=$1 AND status='active'`,
    [userId]
  );
  if(Number(bookingCheck.rows.length>0)){
    throw new Error("Cannot delete user: Active bookings exist");
  }
  const result = await pool.query(
    `
    delete from users where id = $1 returning id,name,email`,
    [userId]
  );
   if (result.rows.length === 0) {
    throw new Error("User not found");
  }
  return result.rows[0];
}
export const userServices = {
  createUser,
getUser,
updateUser,
deleteUser
};