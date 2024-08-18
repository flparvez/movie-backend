import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";

import { BiSolidMovie } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { RiMovie2Line } from "react-icons/ri";
import { RiDraftLine } from "react-icons/ri";
import Spinner from "@/components/Spinner";
import { FcRating } from "react-icons/fc";


export default function Home() {

 
  
  const { alldata, loading } = useFetchData("api/getmovies");
  // console.log(alldata,loading)
  const publishMovies = alldata.filter((ab) => ab.status === "publish");
  const draftMovies = alldata.filter((ab) => ab.status === "draft");


  
  return (
    <>
      <Head>
        <title>Movie App | Backend</title>
        <meta name="description" content="Movie website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="topheadertitle flex flex-sb ">
            <div>
              <h1 className="mb-1">Explore All Type of Movies</h1>
              <p className="mb-2 w-66">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                voluptatibus nobis iste laudantium nesciunt reiciendis! Et,
                nobis praesentium eum explicabo enim nostrum delectus fuga quis
                itaque beatae, consectetur repellat aut doloribus tempora omnis
                accusantium!
              </p>
              <Link href="/">
                <button>
                  Exclusive On <span>MakeMovies</span>
                </button>
              </Link>
            </div>
            <img src="/img/rocket.png" alt="rocket" />
          </div>
          <div className="fourcards flex flex-sb">


            <div className="fcard">
              <div className=" flex flex-sb">
                <div className="fcardsvg">

              
                <BiSolidMovie />
                </div>
             
              <h3>Total Movies</h3>
              <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100">
                <img src="/img/chartone.svg" alt="chart" />
                <h3>{publishMovies.length}</h3>
              </div>
            </div>

   
            <div className="fcard">
              <div className=" flex flex-sb">
                <div className="fcardsvg">

              
                <TbCategoryPlus />
                </div>
             
              <h3>Category</h3>
              <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100">
                <img src="/img/charttwo.svg" alt="chart" />
                <h3>7</h3>
              </div>
            </div>


   
            <div className="fcard">
              <div className=" flex flex-sb">
                <div className="fcardsvg">

              
                <RiMovie2Line />
                </div>
             
              <h3>All Genre</h3>
              <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100">
                <img src="/img/chartthree.svg" alt="chart" />
                <h3>11</h3>
              </div>
            </div>





   
            <div className="fcard">
              <div className=" flex flex-sb">
                <div className="fcardsvg">

                <RiDraftLine />
                </div>
             
              <h3>Draft Movies</h3>
              <BsThreeDotsVertical />
              </div>
              <div className="flex flex-sb wh-100">
                <img src="/img/chartfour.svg" alt="chart" />
                <h3>{draftMovies.length}</h3>
              </div>
            </div>
          </div>
<div className="moviecards flex flex-col flex-left gap-2 w-100">
<div className="flex flex-sb w-100 movietitle">
<h2>List Latest Movies</h2>
<Link href='/addmovie'> <button type="button">Add Movie</button></Link>
</div>
{
  loading ? <div><Spinner/> </div> : <>
  
  {publishMovies.slice(0,3).map((movie)=>{
    return <div className="moviecard" key={movie._id}>
      <img src={movie.bgposter || "/img/noimage.jpg"} alt="movie" />
      <div className="moviecardinfo">
        <div>
          <h3>{movie.slug}</h3>
          <p>{movie.category}</p>
        </div>

        <Link href='/'>{movie?.downloadlink['720p']} </Link>
<div>
<FcRating/> {movie.rating}
</div>

        <div className="flex gap-2 mt-2">
          <Link href={`/movies/edit/${movie._id}`}>
            <button type="button">Update Movie</button>
          </Link>
         <Link href={`/movies/delete/${movie._id}`}>
            <button type="button">Delete Movie</button>
          </Link>
         
        </div>
      </div>
    </div>
  })}
  </>
}
<Link href='/movies' className="loadmorehomebtn w-100 flex flex-center mt-2"><button type="button">Load More</button> </Link>

</div>

        </div>
      )}
    </>
  );

}

