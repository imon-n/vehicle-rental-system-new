import {Router} from "express";
import auth from "../../middleware/auth"
import * as vehicleController from "../vehicle/vehicle.controller";
const router = Router();
router.post("/",auth("admin"),vehicleController.createVehicle);
router.put("/:vehicleId",auth("admin"),vehicleController.updateVehicle);
router.delete("/:vehicleId",auth("admin"),vehicleController.deleteVehicle);

router.get("/",vehicleController.getVehicles)
router.get("/:vehicleId",vehicleController.getVehicle)
export default router;