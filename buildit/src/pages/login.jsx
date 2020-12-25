import React, { useState } from "react";
import { auth } from "utils/nhost";
import { useRouter } from 'next/router'
import Link from 'next/link'


export default function Register () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()
        console.log("form submitted");
        try {
            await auth.login(email, password);
        } catch (error) {
            return alert("login failed")
        }
        router.push("/")
    }

    return (
        <div className="flex flex-col max-w-xl mx-auto shadow p-4 my-12">
            <div className="text-center text-white pb-4">LOGIN</div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <input 
                            type="text" 
                            placeholder="Email"
                            className="border rounded px-2 py-1 my-2"
                            value={email} 
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            className="border rounded px-2 py-1 my-2"
                            value={password} 
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <div className="flex justify-center">
                            <button className="bg-black text-white px-4 py-2 border border-green-900">Login!</button> 
                        </div>
                        <div className="pt-6 text-center text-white"> 
                            Don't have an account?{" "} 
                            <Link href="/register">
                                <a className="text-indigo-700 hover:underline">Register</a>
                            </Link>
                        </div>       
                    </div>
                </form>
        </div>
    )
}