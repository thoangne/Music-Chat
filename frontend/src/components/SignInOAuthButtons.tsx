import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { Chrome } from "lucide-react";
const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded || !signIn) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className=" text-white border-zinc-200 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-blue-400 hover:from-red-600 hover:to-yellow-300 shadow-lg transform transition-transform duration-200 hover:scale-105"
    >
      <Chrome /> Continue with Google
    </Button>
  );
};

export default SignInOAuthButtons;
