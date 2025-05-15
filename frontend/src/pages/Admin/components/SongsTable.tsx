import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
  const { songs, isLoading, error, albums, deleteSong } = useMusicStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">Error loading songs</div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[700px] text-sm">
        <TableHeader>
          <TableRow className="bg-zinc-900 text-zinc-300">
            <TableCell className="w-[60px] font-semibold">Image</TableCell>
            <TableCell className="font-semibold">Title</TableCell>
            <TableCell className="font-semibold">Artist</TableCell>
            <TableCell className="font-semibold">Album</TableCell>
            <TableCell className="font-semibold">Year</TableCell>
            <TableCell className="text-right font-semibold">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-10 h-10 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium text-white">
                {song.title}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {song.artist || "Unknown"}
                </span>
              </TableCell>
              <TableCell className="text-zinc-400">
                {albums.find((album) => album._id === song.albumId)?.title ||
                  "—"}{" "}
              </TableCell>
              <TableCell className="text-zinc-400">
                {song.createdAt?.split("T")[0] || "—"}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={() => deleteSong(song._id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SongsTable;
