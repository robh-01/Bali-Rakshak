import { Router } from "express";
const prescriptionRouter = Router();

import { prescriptionGet } from "../controllers/prescriptionController.js";

prescriptionRouter.get("", prescriptionGet);

export { prescriptionRouter };
