import { Link } from "react-router-dom";
import { LayoutDashboardIcon } from "lucide-react";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { useAuthStore } from "@/stores/useAuthStore";

const Topbar = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  return (
    <div className="backdrop-blur-md z-10 flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 shadow-md">
      <div className="flex gap-2 items-center text-white font-bold text-xl">
        <img src="./logo.png" className="size-8" alt="" />
        Music & Chat
      </div>
      <div className="flex gap-4 items-center">
        {isAdmin && (
          <Link
            to={"/admin"}
            className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
          >
            <LayoutDashboardIcon />
            <span>Admin Dashboard</span>
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
