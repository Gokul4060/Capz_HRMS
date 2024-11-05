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

const PORT = process.env.PORT || 5000;
const app = express();

// Establish DB Connection with error handling
try {
  dbConnection();
  console.log(chalk.blue.bold("Database connection established successfully."));
} catch (error) {
  console.error(chalk.red.bold("Error connecting to the database:"), error);
}

// CORS configuration
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

// Root Route to handle default path
app.get("/", (req, res) => {
  res.send("Welcome to the CAPZ HRMS API");
});

// Route handling
app.use("/api", routes);
app.use(routeNotFound);
app.use(errorHandler);

// Start the server with error handling
app.listen(PORT, (error) => {
  if (error) {
    console.error(chalk.red.bold("Error starting the server:"), error);
  } else {
    console.log(chalk.green.bold.bgCyan(`Server listening on port ${PORT}`));
  }
});
