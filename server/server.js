import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhooks } from "./controllers/clerkWebhooks.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());

app.post("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => res.send("API IS WORKING"));

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
