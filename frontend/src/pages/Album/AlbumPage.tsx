import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";

export const formatDuration = (duration: number) => {
  const roundedDuration = Math.round(duration);
  const minutes = Math.floor(roundedDuration / 60);
  const seconds = roundedDuration % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    const isCurrentAlbumPlaying =
      currentAlbum?.songs.some((song) => song._id === currentSong?._id) &&
      isPlaying;

    if (isCurrentAlbumPlaying) {
      togglePlay();
    } else {
      playAlbum(currentAlbum!.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum.songs, index);
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038]/80 via-zinc-900/80 to-zinc-900"
            aria-hidden="true"
          ></div>

          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl || "/image.png"}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-8xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>
                <div className="flex gap-2 text-sm text-zinc-100 items-center">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>| {currentAlbum?.songs.length} songs</span>
                  <span>| {currentAlbum?.releaseYear || "2025"}</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 bg-yellow-500 hover:bg-yellow-600 rounded-full text-white"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="h-7 w-7 text-white" />
                ) : (
                  <Play className="h-7 w-7 text-white" />
                )}
              </Button>
            </div>

            <div className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden">
              <div className="grid grid-cols-[32px_4fr_2fr_1fr] gap-4 px-6 py-3 text-sm font-semibold text-zinc-300 border-b border-white/10">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              <div className="px-4">
                <div className="divide-y divide-white/5">
                  {currentAlbum?.songs.map((song: any, index: number) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className="grid grid-cols-[32px_4fr_2fr_1fr] gap-4 px-2 py-3 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer transition-all duration-200"
                      >
                        <div className="flex items-center justify-start">
                          {isCurrentSong && isPlaying ? (
                            <Pause className="h-4 w-4 text-white" />
                          ) : isCurrentSong && !isPlaying ? (
                            <Play className="h-4 w-4 text-white" />
                          ) : (
                            <>
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                              <Play className="h-4 w-4 hidden group-hover:block text-white" />
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <img
                            className="w-10 h-10 object-cover rounded"
                            src={song.imageUrl || "/image.png"}
                            alt={song.title}
                          />
                          <div className="flex flex-col">
                            <span className="text-white font-medium">
                              {song.title}
                            </span>
                            <span className="text-xs text-zinc-400">
                              {song.artist}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {song.createdAt?.split("T")[0] || "2025"}
                        </div>

                        <div className="flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
