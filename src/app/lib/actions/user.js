import User from "../models/user.model";
import { connect } from "../mogodb/mongoose";

export const createdOrUpdatedUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connect();
    const email = email_addresses?.[0]?.email_address || "";
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email: email,
          username: username,
        },
      },
      { new: true, upsert: true }
    );
    console.log("User created/updated:", user);
    return user;
  } catch (error) {
    console.log("Error creating or updating user:", error);
    throw new Error("Error creating or updating user");
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
};
