import { Route, Routes } from "react-router-dom";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import HomePage from "./pages/Home/HomePage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
export default function App() {
  return (
    //token =>

    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpFallbackRedirectUrl={"/auth-callback"}
            />
          }
        ></Route>
        <Route path="/auth-callback" element={<AuthCallbackPage />}></Route>
      </Routes>
    </>
  );
}
