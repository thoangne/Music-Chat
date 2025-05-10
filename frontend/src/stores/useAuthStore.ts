import AxiosInstance from "@/lib/AxiosInstance";
import { create } from "zustand";


interface AuthStore{
    isAdmin: boolean;
    isLoading: boolean;
    error: string | null;
    checkAdminStatus: ()=>Promise<void>;
    reset : () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    isLoading: false,
    error: null,
    reset: () => set({isAdmin:false,isLoading:false,error:null}),
    checkAdminStatus: async () => {
        set({isLoading:true,error:null})
        try {
            const res = await AxiosInstance.get('/admin/check')
            set({isAdmin:res.data})
        } catch (error:any) {
            set({error:error.res.data.message,isAdmin:false})
        } finally {
            set({isLoading:false})
        }
    }
}));