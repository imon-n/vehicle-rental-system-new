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

if(req.user.role==="admin"){
    const fromdata = bookings.map((row:any)=>({
        id: row.id,
        customer_id:row.customer_id,
        vehicle_id:row.vehicle_id,
        rent_start_date:row.rent_start_date.toISOString().split("T")[0],
        rent_end_date:row.rent_end_date.toISOString().split("T")[0],
        total_price:Number(row.total_price),
        status:row.status,
        customer:{
            name:row.name,
            email:row.email,
        },
        vehicle:{
            vehicle_name:row.vehicle_name,
            registration_number:row.registration_number,
        },
        
    }))
      res.status(200).json({
        success:true,
        message:"Bookings retrieved successfully",
        data: fromdata,});
}
   const fromdata = bookings.map((row:any)=>({
        id: row.id,
        customer_id:row.customer_id,
        vehicle_id:row.vehicle_id,
        rent_start_date:row.rent_start_date.toISOString().split("T")[0],
        rent_end_date:row.rent_end_date.toISOString().split("T")[0],
        total_price:Number(row.total_price),
        status:row.status,
        customer:{
            name:row.name,
            email:row.email,
        },
        vehicle:{
            vehicle_name:row.vehicle_name,
            registration_number:row.registration_number,
        },
        
    }))
     res.status(200).json({
        success:true,
        message:"Bookings retrieved successfully",
        data: fromdata,});
}
  catch(err:any){
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