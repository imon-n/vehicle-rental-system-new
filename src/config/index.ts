import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const conver = {
  connection_str: process.env.connection_str,
  port: process.env.PORT,
  jwt_secret: process.env.jwt_secret,
};
console.log(conver.jwt_secret)
export default conver;