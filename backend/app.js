import express from "express";
const app = express();

import cors from "cors";

import { indexRouter } from "./routes/indexRouter.js";

import { configPassport } from "./configs/passport.config.js";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/postImages", express.static("postImages"));

configPassport();

app.use("", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server listening on port ${PORT}...`));
