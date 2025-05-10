import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Music, Users } from "lucide-react";
import React, { useEffect } from "react";

const FriendActivity = () => {
  const { fetchUser, users } = useChatStore();
  const { user } = useUser();
  useEffect(() => {
    if (user) fetchUser();
  }, [fetchUser, user]);

  const isPlaying = true;
  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-zinc-800">
        <div className=" flex items-center gap-2">
          <Users className="size-5 shrink-0" />
          <h2 className="font-semibold">What they're listening to</h2>
        </div>
      </div>
      {!user && <LoginPromt />}
      <ScrollArea className="flex-1 ">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-3 cursor-pointer p-3 rounded-md hover:bg-zinc-800/60 transition-colors"
          >
            {/* Avatar */}
            <div className="relative">
              <Avatar className="size-10 border border-zinc-700">
                <AvatarImage src={user.imageUrl} alt={user.fullName} />
                <AvatarFallback>{user.fullName[0]}</AvatarFallback>
              </Avatar>
              {/* Online status dot */}
              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-zinc-900 rounded-full" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-ellipsis truncate">
                  {user.fullName}
                </span>
                {isPlaying && <Music className="size-3.5 text-green-500" />}
              </div>
              {isPlaying ? (
                <div className="text-sm mt-0.5">
                  <div className="text-slate-400 truncate font-bold">
                    Cargigan
                  </div>
                  <div className="text-xs text-zinc-400 truncate">by Ye</div>
                </div>
              ) : (
                <div className="text-xs  text-zinc-600 mt-0.5">Idle</div>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default FriendActivity;

const LoginPromt = () => {
  return <div>You must be logged in</div>;
};
