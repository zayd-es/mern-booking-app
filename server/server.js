import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { clerkWebhooks } from "./controllers/clerkWebhooks.js";

const app = express();
app.use(cors());

// Express json middleware خاصو يدوز من بعد الـ Webhook ولا تستعمل express.raw
app.use("/api/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API IS WORKING"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
