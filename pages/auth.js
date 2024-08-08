import Loading from "@/components/Loading";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";


export default function Auth() {
    const {data:session,status}=useSession()

   
  
   
    
    return <>
        <Head>
            <title>Movie App | Backend</title>
        </Head>
     <div className="container">
    <div className="loginfront flex flex-center">
        <div className="loginbox flex flex-col">

        <Image src='/img/coder.jpeg' width={250} height={250} />
        <h1>Welcome Admin of the  makmovies</h1>
        <p>visit our admin <a href="/" >Flparvez</a></p>
            
            { session ? <button onClick={signOut}>Logout Here</button> : <button onClick={signIn}>Login With Google</button> }
        </div>

    </div>
     </div>

    </>
}