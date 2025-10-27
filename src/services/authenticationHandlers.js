import { signIn, signOut } from "./authClient";
import notification from "../components/ToastNotification";


export const googleLoginHandler = async () =>{
    try {
      const response = await signIn.social({
          provider: "google",
          callbackURL: `${import.meta.env.VITE_CLIENT}/dashboard`,
        })
  
      console.log(response)
    } catch (error) {
      console.log("Login failed", error)
      
    }
  }


// Logout Handler
export const logoutHandler = async(navigate)=>{
    try {
        const response = await signOut();
    
        if(response.error){
            // console.error("Failed to logout", response.error.message)
             notification(`Logout Failed:${ response.error.message}`, false)
            return;
        }

        navigate("/")
    } catch (error) {
         console.log("Registration failed", error)
    }


}