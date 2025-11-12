import { authClient } from "./authClient";
import { useEffect } from "react";

export default function GoogleCallback() {
  console.log("works")
  useEffect(() => {
    const finishLogin = async () => {
      try {
        // finish the OAuth login by sending the current URL to the backend
        await authClient.fetchCallback(window.location.href);
        // redirect to your app dashboard after successful login
        window.location.href = "/";
      } catch (err) {
        console.error("OAuth callback failed", err);
        window.location.href = "/login?error=oauth_failed";
      }
    };

    finishLogin();
  }, []);

  return <div>Logging you in...</div>;
}