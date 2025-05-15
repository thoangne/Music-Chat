import AxiosInstance from "@/lib/AxiosInstance"
import { create } from "zustand"
import { Album, Song,Stats } from "@/types/index"
import toast from "react-hot-toast"

interface MusicStore {
    songs: Song[],
    albums: Album[],
    isLoading: boolean,
    error: string | null,
    currentAlbum: Album | null,
    madeForYouSong: Song[],
    trendingSong: Song[],
    featuredSong: Song[],
    stats:Stats,

    fetchAlbums: () => Promise<void>
    fetchAlbumsId: (id: string) => Promise<void>
    fetchFeaturedSong: () => Promise<void>
    fetchTrendingSong: () => Promise<void>
    fetchMadeForYouSong: () => Promise<void>
    fetchStats: () => Promise<void>
    fetchSongs: () => Promise<void>
    deleteSong: (id: string) => Promise<void>
    deleteAlbum: (id: string) => Promise<void>
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
    stats: {
        totalUsers: 0,
        totalAlbums: 0,
        totalSongs: 0,
        totalViews: 0,
        totalArtists:0 
    
    },
    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await AxiosInstance.delete(`admin/ablums/${id}`)
            set((state) => ({
                albums: state.albums.filter((album) => album._id !== id),
                songs: state.songs.map((song) =>
                    song.albumId === state.albums.find((a) =>
                        a._id === id)?.title ? {...song,album:null}:song
                )
            }))
      } catch (error:any) {
            set({ error: error.message })
            toast.error("Error deleting album")
      } finally {
          set({isLoading:false})
      }
    },
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
    deleteSong: async (id) => {
        set({ isLoading: true, error: null })
        try {
             await AxiosInstance.delete(`admin/songs/${id}`)
            set(
                state => ({
                    songs: state.songs.filter(song => song._id !== id)
                })
            )

            toast.success("Song deleted successfully")
        } catch (error: any) {
            set({ error: error.response?.data?.message || "An error in deleting song" })
            toast.error("Error deleting song")
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
    },

    fetchStats: async()=> {
        set({ isLoading: true, error: null })
        try {
            const res = await AxiosInstance.get("/stats")
            set({ stats: res.data })
        } catch (error:any) {
            set({error:error.message})
        } finally {
            set({isLoading:false})
        }
    },
    fetchSongs: async()=> {
        set({ isLoading: true, error: null })
        try {
            const res = await AxiosInstance.get("/songs")
            set({ songs: res.data})
        } catch (error: any) {
        set({error:error.message})    
        
        } finally {
            set({isLoading:false})
        }
    },
}))
