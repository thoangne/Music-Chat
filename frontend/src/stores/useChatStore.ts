import AxiosInstance from "@/lib/AxiosInstance";
import { create } from "zustand"

interface ChatStore{
    users: any[];
    fetchUser: () => Promise<void>
    isLoading: boolean;
    error: string | null;

}   

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    fetchUser: async () => {
        set({isLoading:true,error:null})
        try {
            const res = await AxiosInstance.get('/users');
            set({users:res.data})
        }catch (error:any) {
            set({error:error.res.data.message})
        } finally {
            set({isLoading:false})
        }

    },
}))