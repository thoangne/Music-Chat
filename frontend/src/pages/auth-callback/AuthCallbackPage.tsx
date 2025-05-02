import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import AxiosInstance from "@/lib/AxiosInstance";
const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const syncAttempted = useRef(false);
  const { isLoaded, user } = useUser();
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return;
      try {
        console.log(user, "user in callback page");
        syncAttempted.current = true;
        await AxiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error in auth callback", error);
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center ">
      <Card className=" w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-x1 font-bold">Logging you in </h3>
          <p className="text-zinc-400 text-sm ">Logging you in</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
