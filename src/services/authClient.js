import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "http://localhost:5050/api/auth",
    fetchOptions: {
    credentials: "include"
  }
})



export const { signIn, signUp, useSession, signOut } = authClient