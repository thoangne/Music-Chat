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

const AlbumsTable = () => {
  const { isLoading, error, albums, deleteAlbum } = useMusicStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading albums...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">Error loading albums</div>
      </div>
    );
  }
  console.log(albums, "albums");
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
            <TableCell className="font-semibold">Song</TableCell>
            <TableCell className="font-semibold">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {albums.map((album) => (
            <TableRow key={album._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="w-10 h-10 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium text-white">
                {album.title}
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  {album.artist || "Unknown"}
                </span>
              </TableCell>
              <TableCell className="text-zinc-400">
                {albums.find((album) => album._id === album._id)?.title || "—"}{" "}
              </TableCell>
              <TableCell className="text-zinc-400">
                {album.releaseYear.toString().split("T")[0] || "—"}
              </TableCell>
              <TableCell className="text-zinc-400">
                {album.songs.length || "—"}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={() => deleteAlbum(album._id)}
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

export default AlbumsTable;
