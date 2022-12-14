import { Router } from "express";
import { bankRouter } from "./bankFuncs.js";
export const indexRoute = Router();
indexRoute.use("/bank", bankRouter);
