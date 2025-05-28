import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AxiosInstance from "@/lib/AxiosInstance";
import { useMusicStore } from "@/stores/useMusicStore";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddSongDialog = () => {
  const { albums } = useMusicStore();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
  });

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", newSong.title);
      formData.append("artist", newSong.artist);
      formData.append("album", newSong.album);
      if (files.audio) {
        formData.append("audio", files.audio);
      }
      if (files.image) {
        formData.append("image", files.image);
      }

      if (newSong.album && newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }

      await AxiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setNewSong({
        title: "",
        artist: "",
        album: "",
      });
      setFiles({
        audio: null,
        image: null,
      });
      setSongDialogOpen(false);
      toast.success("Song added successfully");
    } catch (error) {
      console.error("Error adding song:", error);
      toast.error("Error adding song");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800">
          <Plus className="mr-2 h-4 w-4" />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className="custom-scroll bg-zinc-900 border-zinc-700 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-white">Add Song</DialogTitle>
          <DialogDescription className="text-center text-white">
            Add a new song to the library
          </DialogDescription>
        </DialogHeader>

        {/* Hidden Inputs */}
        <input
          type="file"
          accept="audio/*"
          hidden
          ref={audioInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFiles((prev) => ({ ...prev, audio: file }));
            }
          }}
        />
        <input
          type="file"
          accept="image/*"
          hidden
          ref={imageInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFiles((prev) => ({ ...prev, image: file }));
            }
          }}
        />

        {/* Upload Artwork */}
        <div
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-emerald-500 transition mb-6"
          onClick={() => imageInputRef.current?.click()}
        >
          {files.image ? (
            <div className="text-center space-y-2">
              <div className="text-sm text-emerald-500 font-medium">
                Image selected
              </div>
              <div className="text-xs text-zinc-400 truncate max-w-[200px] mx-auto">
                {files.image.name}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles((prev) => ({ ...prev, image: null }));
                }}
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="p-3 bg-zinc-800 rounded-full inline-block">
                <Upload className="w-6 h-6 text-zinc-400" />
              </div>
              <div className="text-sm text-zinc-400">Upload artwork</div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-white"
              >
                Choose File
              </Button>
            </div>
          )}
        </div>

        {/* Upload Audio */}
        <div className="mb-4 space-y-2">
          <label className="text-sm font-medium text-white">Audio File</label>
          <div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs text-white w-full"
              onClick={() => audioInputRef.current?.click()}
            >
              {files.audio ? files.audio.name : "Choose File"}
            </Button>
          </div>
        </div>

        {/* Song Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Title</label>
            <Input
              value={newSong.title}
              onChange={(e) =>
                setNewSong((prev) => ({ ...prev, title: e.target.value }))
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Artist</label>
            <Input
              value={newSong.artist}
              onChange={(e) =>
                setNewSong((prev) => ({ ...prev, artist: e.target.value }))
              }
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Album</label>
            <Select
              value={newSong.album}
              onValueChange={(value) =>
                setNewSong((prev) => ({ ...prev, album: value }))
              }
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue
                  className="placeholder:text-zinc-400"
                  defaultValue="Select an album"
                />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                <SelectItem value="none">No Album</SelectItem>
                {albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Add Song"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
