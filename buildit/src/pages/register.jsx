import React, { useState } from "react";
import Link from 'next/link'
import { auth } from "utils/nhost";
import { useRouter } from 'next/router'

export default function Register () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

async function handleSubmit(event) {
  event.preventDefault()
  console.log("form submitted");

  try {
      await auth.register(email, password);
  } catch (error) {
      return alert("register failed")
  }
  router.push("/login")
  
}

    return (
        <div className="flex flex-col max-w-xl mx-auto shadow p-4 my-12">
            <div className="text-center pb-4 text-white">REGISTER</div>
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
                            <button className="btn bg-black border border-green-800 text-white px-4 py-2">Register!</button> 
                        </div>
                        <div className="pt-6 text-center text-white">
                            Have an account already?{" "} 
                            <Link href="/login">
                                <a className="a-btn underline">Login</a>
                            </Link>
                        </div>          
                    </div>
                </form>
        </div>
    )
}