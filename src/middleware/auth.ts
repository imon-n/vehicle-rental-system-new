
// higher order function  return korbe function k

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// roles = ["admin", "user"]
const auth = (...roles: string[]) => {
  return async (req: Request  & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
          success:false,
          messages:"Unauthorized: No token provided",
        });
      }
      const token = authHeader.split(" ")[1];
      const decoded: any = jwt.verify(
        token as string,
        config.jwt_secret as string
      );
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        
        return res.status(403).json({
         success:false, 
          message: "Forbidden: Access denied", 
        });
      
    
    }
     

      next();
    } catch (error) {
     return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
  };
};

export default auth;