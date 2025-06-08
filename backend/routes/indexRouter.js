import { Router } from "express";
const indexRouter = Router();

import { prescriptionRouter } from "./prescriptionRouter.js";

// indexRouter.get("", (req, res) => {
//   console.log("it's working");
// });

indexRouter.use("/prescription", prescriptionRouter);

export { indexRouter };
