import { Router } from "express";
const indexRouter = Router();

import { prescriptionRouter } from "./prescriptionRouter.js";
import { aiAnswerRouter } from "./aiAnswerRouter.js";

// indexRouter.get("", (req, res) => {
//   console.log("it's working");
// });

indexRouter.use("/prescription", prescriptionRouter);
indexRouter.use("/aiAnswer", aiAnswerRouter)

export { indexRouter };
