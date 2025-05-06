import { json } from "express";
import Album from "../models/album.model.js";

export const getAllAlbum = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    console.log(albumId, "album id");
    const albums = await Album.findById(albumId).populate("songs");

    if (!albums) {
      return res.status(400).json({ message: "Album not found" });
    }
    return res.status(200).json(albums);
  } catch (error) {
    console.log("ERROR at album");
  }
};
