
import Loading from "@/components/Loading";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function profile() {
    const {data:session,status}=useSession()

    const router = useRouter();
    if (status === 'loading') {
      return <Loading />
    }
  
    if (!session) {
      router.push('/auth')
      return null;
    }
  
if (session) {
    
    return <>
        <Head>
            <title>Profile page</title>
        </Head>
      <div className="container">

    <div className="profilesetting">
    <div className="leftprofile_details flex">
        <img src="/img/coder.jpeg" alt="code" />
        <div className="w-100">
            <div className="flex flex-sb flex-left mt-2">
        <h2>My Profile</h2>
        <h3>FLp Code <br /> Web Developer</h3>
            </div>
        <div className="flex felx-sb mt-2">
        <h3>Phone</h3>
        <input type="text" defaultValue="+8801608257876" />
        </div>
 <div className=" mt-2">
      
        <input type="text" defaultValue="codingloverparvez@gmail.com" />
        </div>
<div className="flex flex-center w-100 mt-2">
<button>Save</button>
</div>
        </div>

    </div>

    <div className="rightlogoutsec">
        <div className="topaccoutnbox">
            <h2 className="flex flex-sb">  My Account <MdOutlineAccountCircle/></h2>
            <hr />
            <div className="flex flex-sb mt-1">
                <h3>Active Account <br /> <span></span></h3>

                { session ? <button onClick={signOut}>Logout</button> : <button onClick={signIn}>Login</button> }
            </div>
        </div>

    </div>
    </div>
      </div>
    </>
}
}