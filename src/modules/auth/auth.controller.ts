import { Request, Response } from "express";
import { authServices } from "./auth.service";
const signup = async (req:Request,res:Response)=>{
  try{
    const result = await authServices.signupUser(req.body);
    res.status(201).json({
      success:true,
      messages:"User registered successfully",
      data:result,
    })
  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message || "Signup failed"
  });
  }
};


const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.signinUser(email, password);
    console.log(result);
    if(result === null){
       return res.status(401).json({
      success: false,
      message: "User not found",
     
    });
    }
    if(result === false){
      return  res.status(401).json({
      success: false,
      message: "Invalid email or password",
     
    });
    }
          res.status(200).json({
      success: true,
      message: "Login successful",
      data:result,
          });
     
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  signin,
  signup
};