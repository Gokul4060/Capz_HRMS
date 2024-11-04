import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./router/route.js";
import morgan from "morgan";
import chalk from "chalk";



import { dbConnection } from "./utils/server.js";

dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const app = express();


app.use(
  cors({
    origin: [
      "https://capzhrms.netlify.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api", routes);
app.use(routeNotFound);
app.use(errorHandler);



app.listen(PORT, () =>
  console.log(chalk.green.bold.bgCyan`Server listening on ${PORT}`)
);



