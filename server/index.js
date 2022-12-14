import express from "express";
import cors from "cors";
import { bankRouter } from "./router/bankFuncs.js";
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use("/api", bankRouter);
app.listen(PORT, () => {
  console.log("Listining to port 5000");
  // console.log("Listining to port 5000");
});
