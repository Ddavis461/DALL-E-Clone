import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

// this line allows us to pool environment variables
dotenv.config();

// initialize express
const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// api endpoints (routes)
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }

  app.listen(8080, () =>
    console.log("Server has started on port http://localhost:8080")
  );
};

startServer();
