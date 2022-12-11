import router from "express";
import { bankRouter } from "./bankFuncs.js";
export const indexRoute = router();
indexRoute.use("bank", bankRouter);
