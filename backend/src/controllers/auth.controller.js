import User from "../models/user.model.js";

export const callback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    let user = await User.findOne({ clerkId: id });
    if (!user) {
      // Sign up
      user = await User.create({
        fullName: `${firstName} ${lastName}`,
        imageURL: imageUrl,
        clerkId: id,
      });
    }

    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error in callback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
