import { Router } from "express";
const prescriptionRouter = Router();

import { prescriptionGet } from "../controllers/prescriptionController.js";

prescriptionRouter.post("", prescriptionGet);

export { prescriptionRouter };
