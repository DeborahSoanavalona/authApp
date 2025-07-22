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
            message: "signed in successfully"
        }
    } catch (error) {
        const e = error as Error
        return{
            succes: false,
            message: { error: e.message || "An unknow error occured" }
        }
    }
}

export const signUp = async() => {
    await auth.api.signUpEmail({
        body: {
            email: "deb@test.com",
            password: "password123",
            name: "deb",
        }
    })
}