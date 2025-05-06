// Removed unused import
import AxiosInstance from "@/lib/AxiosInstance"
import { create } from "zustand"
import { Album ,Song} from "@/types/index"
interface MusicStore{
    songs: Song[],
    albums: Album[],
    isLoading: boolean,
    error: string | null,
    currentAblum: Album | null,

    fetchAlbums: () => Promise<void>
    fetchAlbumsId: (id:string) => Promise<void>
    
}
export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAblum: null,
    fetchAlbums: async () => {
        set({
            isLoading:true,error:null
        })
        try {
            const res = await AxiosInstance.get("/albums")
            set({albums: res.data})
        } catch (error:any) {
            set({error:error.res.data.message})
        } finally {
            set({isLoading:false})
        }
    },

    fetchAlbumsId: async (id:string) => {
        set({isLoading:true,error:null})
        try {
            const res = await AxiosInstance.get(`/albums/${id}`)
            set({currentAblum: res.data});
            
        } catch (error:any) {
            set({error:error.res.data.message})
        } finally {
            set({isLoading:false})
        }
    },
}))