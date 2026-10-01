import prisma from "../configs/prisma.js";
import { Webhook } from "svix";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // req.body غايتستقبل كـ Buffer حيت استعملنا express.raw
    const payload = req.body.toString();

    // التحقق بواسطة الـ raw payload
    const evt = whook.verify(payload, headers);
    const { data, type } = evt;

    if (type === "user.created") {
      const userData = {
        id: data.id,
        email: data.email_addresses[0].email_address,
        username:
          `${data.first_name || ""} ${data.last_name || ""}`.trim() || data.id,
        image: data.image_url,
      };

      await prisma.user.create({ data: userData });
      return res.json({ success: true, message: "User created successfully" });
    }

    if (type === "user.updated") {
      const userData = {
        email: data.email_addresses[0].email_address,
        username:
          `${data.first_name || ""} ${data.last_name || ""}`.trim() || data.id,
        image: data.image_url,
      };

      await prisma.user.update({
        where: { id: data.id },
        data: userData,
      });
      return res.json({ success: true, message: "User updated successfully" });
    }

    if (type === "user.deleted") {
      await prisma.user.delete({
        where: { id: data.id },
      });
      return res.json({ success: true, message: "User deleted successfully" });
    }

    return res.json({ success: true, message: "Event received" });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};
