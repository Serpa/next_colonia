import * as React from "react";
import {useSession} from "next-auth/react";
import Link from 'next/link'
import {useRouter} from "next/router";

export default function Wrapper(props)
{
    const session = useSession();
    const router = useRouter();

    if ((session !== null && session?.status === "authenticated") ||
        (router.pathname === "/login" || router.pathname === '/register'))
    {
        return (
            props.children
        )
    }
    else {
        return (
            <>
                <h1>You are not authenticated</h1>

                <Link href='/login'>Back to Login</Link>
            </>
        )
    }

}