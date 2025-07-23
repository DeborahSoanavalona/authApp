"use server";
import { auth } from "@/lib/auth"
 
export const signIn = async (email:string, password:string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        return{
            succes: true,
            message: "Logged in successfully"
        }
    } catch (error) {
        const e = error as Error
        return{
            succes: false,
            message: e.message || "An unknow error occured"
        }
    }
}

export const signUp = async(email:string, password:string, username:string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: username,
            }
        })

        return{
            succes: true,
            message: "Signed up successfully",
        }
    } catch (error) {
        const e = error as Error
        return{
            succes: false,
            message: e.message || "An unknown error occured",
        }
    }
}


export const logOut = async() => {
    try {
        return{
            succes: true,
            message: "Logged out successfully",
        }
    } catch (error) {
        const e = error as Error
        return{
            succes: false,
            message: e.message || "An unknown error occured",
        }
    }
}