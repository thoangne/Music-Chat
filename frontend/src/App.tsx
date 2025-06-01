import { Route, Routes } from "react-router-dom";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import HomePage from "./pages/Home/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/ChatPage/ChatPage";
import AlbumPage from "./pages/Album/AlbumPage";
import AdminPage from "./pages/Admin/AdminPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";
export default function App() {
  return (
    //token =>

    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpFallbackRedirectUrl={"/auth-callback"}
            />
          }
        ></Route>
        <Route path="/admin" element={<AdminPage />}></Route>

        <Route path="/auth-callback" element={<AuthCallbackPage />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chat" element={<ChatPage />}></Route>
          <Route path="/albums/:albumId" element={<AlbumPage />}></Route>
          <Route path="/*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
