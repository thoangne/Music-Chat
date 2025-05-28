import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  console.log(req.auth, "req auth");
  if (!req.auth.userId) {
    res.status(401).send("Unauthorized access to this route");
    return;
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);
    console.log(user, "user admin");
    const isAdmin =
      process.env.ADMIN_EMAIL === user.primaryEmailAddress?.emailAddress;
    console.log(isAdmin, "isAdmin");
    if (!isAdmin) {
      return res.status(403).send("Forbidden: Admins only");
    }
    next();
  } catch (error) {
    console.error("Error in requireAdmin:", error);
    next(error);
  }
};
