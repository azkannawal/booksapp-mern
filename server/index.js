import express from "express";
import { PORT, DATABASE_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send(`You were in ${PORT} port, Kudos bro`);
});

app.use("/books", booksRoutes);

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("App connected to database lads");
    app.listen(PORT, () => {
      console.log(`You were in ${PORT} port`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
