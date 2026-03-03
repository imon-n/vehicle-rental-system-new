import {Request,Response} from "express";
import * as bookingService from "./booking.service";
export const createBooking = async(req:any,res:Response)=>{
try{
    const booking = await bookingService.createBooking(req.user,req.body);
    res.status(201).json({success:true,
        message:"Booking created successfully",
        data:booking,
    });
}catch(err:any){
    res.status(400).json({
        success:false,
        message:err.message,
         errors:err.message,});
}

}

export const getBookings = async(req:any,res:Response)=>{
try{
    const bookings = await bookingService.getBookings(req.user);
    res.status(200).json({
        success:true,
        message:
        req.user.role === "admin"
        ? "Bookings retrieved successfully"
        : "Your bookings retrieved successfully",
        data: bookings,});
}catch(err:any){
    res.status(400).json({success:false,
        message:err.message,
    errors:err.message,});
}

}

export const updateBooking = async(req:any,res:Response)=>{
try{
    const result = await bookingService.updateBooking(
        req.user,
        Number(req.params.bookingId),
            req.body
        );

  const isCancelled = result.status === "cancelled";      
    res.status(200).json({success:true,
        message:isCancelled
        ? "Booking cancelled successfully"
        :"Booking marked as returned.Vehicle is now available",

        data: result});
}catch(err:any){
    res.status(400).json({success:false,
        message:err.message,
    errors:err.message});
}

}