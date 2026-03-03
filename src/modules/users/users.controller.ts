import { Request, Response } from "express";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.createUser(req.body);
    // console.log(result.rows[0]);
    res.status(201).json({
      success: false,
      message: "User created Successfully",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
      errors:err.message,
    });
  }
};
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
      errors:err.message,
    });
  }
};

const updateUser = async (req: Request  & { user?: any }, res: Response) => {
  try {
    const userId = Number(req.params.userId);


    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can only update your own profile",
      });
    }

    const updated = await userServices.updateUser(userId, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updated,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message,errors:err.message, });
  }
};


const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const deleted = await userServices.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deleted,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message,errors:err.message, });
  }
};
export const userControllers = {
  createUser,
  getUser,
  updateUser,
  deleteUser

};