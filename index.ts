import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import fileHandler from "./src/routes/file";

dotenv.config();
const app = express();
const port = process.env.PORT || 3300;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/data", fileHandler);

app.use("/", (req: Request, res: Response) => {
  res.json({
    status: 200,
    message: "API is working fine",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
