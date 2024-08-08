import axios from "axios";
import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {

    const router = useRouter();
    const { id } = router.query;
    // console.log(id)
    const [movieInfo,setMovieInfo]= useState(null)
    
    useEffect(() => {
        if (!id) {
            return
        }else{
            axios.get('/api/getmovies?id=' + id).then(response => {
                setMovieInfo(response.data)
               
            })
        }
        
    }, [id]);

    // go back to home
    function goback(){
        router.push('/')
    }

    async function deleteMovie(){
        await axios.delete('/api/getmovies?id=' + id)
        goback()
    }
    return <>

        <Head>
            <title>Update Website</title>
        </Head>

        <div className="blogpage container">
            <div className="titledashaboard  flex flex-sb">
                 <div className="mb-2">
                 <h2>Edit Movie: <span>{movieInfo?.title}</span></h2>
                 <h3>Admin Panel</h3>
                 </div>
            </div>
           

            <div className="deletesec flex flex-center w-100">
                <div className="deletecard">

                <svg
                        viewBox="0 0 24 24"
                        fill="red"
                        height="6em"
                        width="6em"
                    >
                        <path d="M4 19V7h12v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2M6 9v10h8V9H6m7.5-5H17v2H3V4h3.5l1-1h5l1 1M19 17v-2h2v2h-2m0-4V7h2v6h-2z" />
                    </svg>

                    <p className="cookieHeading">
                    Are You Sure?
                    </p>
        <p className="cookieDescription">If You Delete this movie content it will permenent delete.</p>
        <div className="buttonContainer">
            <button onClick={deleteMovie} className="acceptButton"> Delete</button>
            <button onClick={goback} className="declineButton"> Cancel</button>
        </div>
                </div>

            </div>
        </div>
    </>
}