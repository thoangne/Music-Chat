import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);
export default Album;
