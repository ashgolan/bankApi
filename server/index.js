import express from "express";
import cors from "cors";
// import { indexRoute } from "./router/index.router.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  try {
    res.send("got in");
  } catch (e) {
    res.send(e.message);
  }
});
// app.use("/api", indexRoute);
app.listen(PORT, () => {
  console.log("Listining to port -" + PORT);
  // console.log("Listining to port 5000");
});
