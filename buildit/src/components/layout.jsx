import React from "react";
import { useRouter } from 'next/router'
import { auth } from "../utils/nhost"
import { useAuth } from "react-nhost";
import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from "@apollo/client"
import { SvgTerminal } from 'components/svg'

const GET_USER_DATA = gql`
    query getUserData($user_id: uuid!) {
        user: users_by_pk(id: $user_id) {
            id
            display_name
        }
    }
`;

export function UserHeader() {
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_USER_DATA, {
        variables: {
            user_id: auth.getClaim("x-hasura-user-id")
        }
    });

    if (loading && !data) {
        return <div>Loading...</div>
    } if (error) {
        console.error("error fetching users")
        console.error(error);
        return <div>Error...</div>
    }

    const { user } = data

    return (
        <div className="flex items-center">
            <div className="px-4">{user.display_name}</div>
            <div 
                onClick={() => {
                auth.logout()
                router.push("/");
            }} 
            className="cursor-pointer"
            > 
                logout
            </div>
        </div>
    )
}

export function Header() {
    const router = useRouter();
    const { signedIn } = useAuth();

    return (
    <div className="flex items-center justify-between text-white p-4 nav-bar">
        <div className="flex"> 
            <SvgTerminal/>
           { <Link href="/">
                <a>console.log</a>

            </Link>}
        </div>
        <div className="flex items-center">
            {signedIn && <div className="px-4">
                <Link href="/new">
                    <a>Create a post</a>
                </Link>
            </div>}
            <div>
                {signedIn ? (
                    <>
                    <UserHeader />
                    </>
                ) : (
                    <div>
                        <Link href="/login">
                            <a className="px-4">Login</a>
                        </Link>
                        <Link href="/register">
                            <a className="px-4">Register</a>
                        </Link>
                    </div>
                )}

            </div>
        </div>
    </div>
    )
}

export function Main({children}) {
    return (<div className="container mx-auto px-4">
        {children}
    </div>
    )
}

export function Layout({children}) {

    return (
        <div>
            <Header />
            {children}
        </div>
    )
}