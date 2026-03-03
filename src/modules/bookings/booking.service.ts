import {pool} from "../../config/db";

// Create booking
export const createBooking = async(user:any,payload:any)=>{
const {vehicle_id,rent_start_date,rent_end_date} = payload;
const vehicleRes = await pool.query(
    `
    select * from vehicles where id=$1`,
    [vehicle_id]
);
if(vehicleRes.rows.length === 0){
    throw new Error("Vehicle not found");
}

const vehicle = vehicleRes.rows[0];
if(vehicle.availability_status!=="available"){
    throw new Error("vehicle is not available");
}
const start = new Date(rent_start_date);
const end = new Date(rent_end_date);
const diffTime = end.getTime()-start.getTime();
const days = Math.ceil(diffTime/(1000*3600*24));
if(days<=0){
    throw new Error("Invalid bookings dates");
}
const total_price = days*vehicle.daily_rent_price;
const bookingRes = await pool.query(
    `
    insert into bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price)
    values($1,$2,$3,$4,$5) returning *`,
    [user.id,vehicle.id,rent_start_date,rent_end_date,total_price]
);
await pool.query(
`
update vehicles set availability_status='booked' where id = $1`,
[vehicle_id]
)
return {...bookingRes.rows[0],
vehicle:{
    vehicle_name:vehicle.vehicle_name,
    daily_rent_price:vehicle.daily_rent_price,
}
}
}

// get bookings
export const getBookings = async(user:any)=>{
    if(user.role === "admin"){
        const result = await pool.query(`
            select 
            b.id,
            b.customer_id,
            b.vehicle_id,
            b.rent_start_date,
            b.rent_end_date,
            b.total_price,
            b.status,
            u.name,
            u.email,
            v.vehicle_name,
            v.registration_number
            from bookings b 
            join users u on b.customer_id = u.id
            join vehicles v on b.vehicle_id = v.id
            `);
            return result.rows;
    }else{
        const result = await pool.query(
            `select 
            b.id,
            b.vehicle_id,
            b.rent_start_date,
            b.rent_end_date,
            b.total_price,
            b.status,
            v.vehicle_name,
            v.registration_number,
            v.type
            from bookings b
            join vehicles v on b.vehicle_id = v.id
            where b.customer_id = $1`,
            [user.id]
        );
        return result.rows;
    }
}

//Update booking

export const updateBooking = async(
    user:any,
    bookingId:number,
    payload:any
)=>{
    const bookingRes = await pool.query(
        `
        select * from bookings where id = $1`,
        [bookingId]
    );
    if(bookingRes.rows.length === 0){
        throw new Error("Booking not found");
    }
    const booking = bookingRes.rows[0];
    console.log(booking.vehicle_id,bookingId)
    if(user.role === 'customer'){
        if(booking.customer_id!==user.id){
            throw new Error("Not authorized");
        }

    const today = new Date();
    const startDate = new Date(booking.rent_start_date);
    if(today>=startDate) {
        throw new Error("Cannot cancle after start date");
    } 

    const updated = await pool.query(
        `
        update bookings set status='cancelled' where id=$1`,
        [bookingId]
    );

    await pool.query(
        `
        update vehicles set availability_status='available' where id = $1`,
        [booking.vehicle_id]
    );
    return updated.rows[0];
    }
    if(user.role === "admin"){
      const updated = await pool.query(
            `
            update bookings set status = 'returned' where id=$1`,
            [bookingId]
        );

    await pool.query(
        `
        update vehicles set availability_status = 'available' where id=$1`,
        [booking.vehicle_id]
    ) ;
    return {...updated.rows[0],
        vehicle:{
            abailability_status:"available"
        }
    }  
    }
}