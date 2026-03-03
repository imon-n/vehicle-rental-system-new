import {pool} from "../../config/db";
export const createVehicle = async(payload:any)=>{
    const {vehicle_name,type,registration_number,daily_rent_price,availability_status="available"} = payload;
    const result = await pool.query(
        `insert into vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status)
        values($1,$2,$3,$4,$5) returning id,vehicle_name,type,registration_number,daily_rent_price,availability_status`,
        [vehicle_name,type,registration_number,Number(daily_rent_price),availability_status]
    );
  const vehicle = result.rows[0];

vehicle.daily_rent_price = Number(vehicle.daily_rent_price);

return vehicle;

};

export const getAllVehicles = async()=>{
    const result = await pool.query(`select id,vehicle_name,type,registration_number,daily_rent_price,availability_status from vehicles`);
    return result.rows;
}

export const getVehicleById = async (vehicleId: number)=>{
    const result = await pool.query(`select id vehicle_name,type,registration_number,daily_rent_price,availability_status from vehicles where id = $1`,[vehicleId])
     if (result.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
      const vehicle = result.rows[0];

vehicle.daily_rent_price = Number(vehicle.daily_rent_price);

return vehicle;
}

export const updateVehicle = async(vehicleId:number,payload:any)=>{
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;
 for(const key in payload){
    fields.push(`${key} = $${idx}`);
    values.push(payload[key]);
    idx++;
 } 
  if (fields.length === 0) {
    throw new Error("No fields provided for update");
  }

 values.push(vehicleId)
 const result = await pool.query(`update vehicles set ${fields.join(", ")},updated_at = NOW() where id=$${idx} returning vehicle_name,type,registration_number,daily_rent_price,availability_status`,
 values
);
  if (result.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

return result.rows[0];
}

export const deleteVehicle = async(vehicleId: number)=>{
    const bookingCheck = await pool.query(
        `
        select count(*) from bookings where vehicle_id = $1 and status='active'`,
        [vehicleId]
    );
    if(bookingCheck.rows.length>0){
        throw new Error("Cannot delete vehicle:Active booking exist");

    }

    const result = await pool.query(`delete from vehicles where id = $1 returning id, vehicle_name, registration_number`,[vehicleId]);
     if (result.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

    return result.rows[0]
}