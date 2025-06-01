import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };
  return (
    <Button
      size="icon"
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-gradient-to-r from-yellow-500 to-blue-400 hover:from-red-600 hover:to-yellow-300
            hover:scale-105 transition-all opacity-0 translate-y-2 
            group-hover:translate-y-0 ${
              isCurrentSong
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }
                `}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-white" />
      ) : (
        <Play className="size-5 text-white" />
      )}
    </Button>
  );
};

export default PlayButton;
