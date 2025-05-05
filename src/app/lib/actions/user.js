import User from "../models/user.model";
import { connect } from "../mogodb/mongoose";

export const createdOrUpdatedUser = async (
  id,
  fiirst_name,
  last_name,
  immage_url,
  email_addresses,
  username
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: fiirst_name,
          lastName: last_name,
          avatar: immage_url,
          email: email_addresses[0].emai,
          username: username,
        },
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.log("Error creating or updating user:", error);
    // throw new Error("Error creating or updating user");
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("Error deleting user:", error);
    //   throw new Error("Error deleting user");
  }
};
