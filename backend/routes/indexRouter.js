import { Router } from "express";
const indexRouter = Router();

import { prescriptionRouter } from "./prescriptionRouter.js";
import { aiAnswerRouter } from "./aiAnswerRouter.js";
import { userRouter } from "./userRouter.js";

// indexRouter.get("", (req, res) => {
//   console.log("it's working");
// });

indexRouter.use("/prescription", prescriptionRouter);
indexRouter.use("/aiAnswer", aiAnswerRouter);
indexRouter.use("/user", userRouter);

export { indexRouter };
