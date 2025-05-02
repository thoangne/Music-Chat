import React, { useState } from "react";
import AxiosInstance from "@/lib/AxiosInstance";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Loader } from "lucide-react";
const updateApiToken = (token: string | null) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error: any) {
        updateApiToken(null);
        console.log("Error in AuthProvider", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);
  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  return <>{children}</>;
};

export default AuthProvider;
