import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data;
    const eventType = evt?.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt?.data);

    if (eventType === "user.created" || eventType === "user.updated") {
      const { id, first_name, last_name, image_url, email_addresses } =
        evt?.data;
      try {
        await createdOrUpdatedUser(
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
          username
        );
        console.log("User Created or Updated", {
          id,
          first_name,
          last_name,
          image_url,
          email_addresses,
          username,
        });
        return new Response("User Created or Updated", { status: 200 });
      } catch (error) {
        console.error("Error creating or updating user:", error);
        return new Response("Error creating or updating user", { status: 400 });
      }
      // Call your function to create or update the user in your database
      // await createdOrUpdatedUser(id, first_name, last_name, image_url, email_addresses, username);
    }
    if (eventType === "user.deleted") {
      const { id } = evt?.data;
      try {
        await deleteUser(id);
        return new Response("User Deleted", { status: 200 });
      } catch (error) {
        console.error("Error deleting user:", error);
        return new Response("Error deleting user", { status: 400 });
      }
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
