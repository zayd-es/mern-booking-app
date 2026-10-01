import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(cors());

// MIDDLEWARE
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API IS WORKING"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
