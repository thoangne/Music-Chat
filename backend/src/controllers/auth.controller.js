import User from "../models/user.model.js";

export const callback = async (req, res) => {
  try {
    const { id, firstname, lastName, imageUrl } = req.body;
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      //sign up
      await User.create({
        fullName: `${firstname} ${lastName}`,
        imageURL: imageUrl,
        clerkId: id,
      });
    }

    return res.status(200).json(user, { success: true });
  } catch (error) {
    console.error("Error in getAdmin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
