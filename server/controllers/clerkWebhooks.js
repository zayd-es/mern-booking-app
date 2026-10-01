import { Webhook } from "svix";
import prisma from "../configs/prisma.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // التحقق باستعمال JSON.stringify(req.body)
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          username:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
            data.id,
          image: data.image_url || "",
        };

        await prisma.user.create({ data: userData });
        return res.json({
          success: true,
          message: "User created successfully",
        });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address || "",
          username:
            `${data.first_name || ""} ${data.last_name || ""}`.trim() ||
            data.id,
          image: data.image_url || "",
        };

        await prisma.user.update({
          where: { id: data.id },
          data: userData,
        });
        return res.json({
          success: true,
          message: "User updated successfully",
        });
      }

      case "user.deleted": {
        await prisma.user.delete({
          where: { id: data.id },
        });
        return res.json({
          success: true,
          message: "User deleted successfully",
        });
      }

      default:
        return res.json({ success: true, message: "Event ignored" });
    }
  } catch (error) {
    console.error("Webhook Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
