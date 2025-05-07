import AxiosInstance from "@/lib/AxiosInstance"
import { create } from "zustand"
import { Album, Song } from "@/types/index"

interface MusicStore {
    songs: Song[],
    albums: Album[],
    isLoading: boolean,
    error: string | null,
    currentAlbum: Album | null,
    madeForYouSong: Song[],
    trendingSong: Song[],
    featuredSong: Song[],

    fetchAlbums: () => Promise<void>
    fetchAlbumsId: (id: string) => Promise<void>
    fetchFeaturedSong: () => Promise<void>
    fetchTrendingSong: () => Promise<void>
    fetchMadeForYouSong: () => Promise<void>
}

export const useMusicStore = create<MusicStore>((set) => ({
    songs: [],
    albums: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    madeForYouSong: [],
    trendingSong: [],
    featuredSong: [],

    fetchAlbums: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await AxiosInstance.get("/albums")
            set({ albums: res.data })
        } catch (error: any) {
            set({ error: error.response?.data?.message || "An error occurred" })
        } finally {
            set({ isLoading: false })
        }
    },

    fetchAlbumsId: async (id: string) => {
        set({ isLoading: true, error: null })
        try {
            const res = await AxiosInstance.get(`/albums/${id}`)
            set({ currentAlbum: res.data })
        } catch (error: any) {
            set({ error: error.response?.data?.message || "An error occurred" })
        } finally {
            set({ isLoading: false })
        }
    },

    fetchFeaturedSong: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await AxiosInstance.get("/songs/feature")
            set({ featuredSong: res.data })
        } catch (error: any) {
            set({ error: error.response?.data?.message || "An error occurred" })
        } finally {
            set({ isLoading: false })
        }
    },

    fetchTrendingSong: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await AxiosInstance.get("/songs/trending")
            set({ trendingSong: res.data })
        } catch (error: any) {
            set({ error: error.response?.data?.message || "An error occurred" })
        } finally {
            set({ isLoading: false })
        }
    },

    fetchMadeForYouSong: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await AxiosInstance.get("/songs/madeforyou")
            set({ madeForYouSong: res.data })
        } catch (error: any) {
            set({ error: error.response?.data?.message || "An error occurred" })
        } finally {
            set({ isLoading: false })
        }
    }
}))
