import { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;
  console.log(isLoading, "skeleton");
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between  m-4">
        <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
        <Button variant="link" className="text-sm hover:text-white">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md  transition-all
            group cursor-pointer hover:bg-zinc-700
            "
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md bg-zinc-700 overflow-hidden">
                <img
                  src={song.imageUrl || "./music.webp"}
                  alt={song.title}
                  className="w-full h-full
                
                object-cover transition-transform duration-300 group-hover:scale-110
                "
                />
              </div>
              <PlayButton song={song}></PlayButton>
            </div>
            <h3 className="font-medium mb02 truncate">{song.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  ); // ({ title, songs }) => {
};

export default SectionGrid;
