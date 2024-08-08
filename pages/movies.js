
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";

import Link from "next/link";

import { useState } from "react";
import { FcRating } from "react-icons/fc";


export default function movies() {
  

const [currentPage,setCurrentPage]= useState(1)
const [perpage]= useState(7)
const [searchQuery,setSearchQuery] = useState('')

// fetch api

const {alldata,loading}=useFetchData('api/getmovies');

// function to add page change
const paginate = (pageNumber)=>{
    setCurrentPage(pageNumber)
}

const allMovie = alldata.length; // Total number of movies
// filter all database movie

const filterMovies = searchQuery.trim() === '' ? alldata : alldata.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));

// calculate index of the first movie displayed current page
const indexOfFirstMovie =(currentPage -1) * perpage; 
const indexOfLastMovie = currentPage * perpage;

// get the current page movie

const currentMovies = filterMovies.slice(indexOfFirstMovie,indexOfLastMovie)

// filter all data base
const publishMovies = currentMovies.filter((ab) => ab.status === "publish");

const pageNumbers = [];

for (let i = 1; i <= Math.ceil(allMovie / perpage); i++){
    pageNumbers.push(i)
}

  
    return <>
    <div className= "container moviecards flex flex-col flex-left gap-2 w-100">
        <div className="flex flex-sb w-100 movietitle">
            <h2>Lis Of Published Movies</h2>
            <Link href='/addmovie'> <button type="button">Add Movie</button></Link>
    
        </div>
        {
            loading ? <Spinner/> : <> 
        {
            publishMovies.map((movie)=> {
                return <div className="moviecard" key={movie._id}>
                <img src={movie.bgposter || "/img/noimage.jpg"} alt="movie" />
                <div className="moviecardinfo">
                  <div>
                    <h3>{movie.slug}</h3>
                    <p>{movie.category}</p>
                  </div>
          
                  <Link href='/'>{movie.downloadlink['720p']} </Link>
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
            })
        }
            </>
        }
        {
            publishMovies.length === 0 ? (
                ""
            ) : (
                <div className="blogpagination">
                    <button onClick={() => paginate(currentPage -1)} disabled={currentPage===1}>
                        Previous
                    </button>
                    {pageNumbers.slice(Math.max(currentPage -3,0), Math.min(currentPage +2,pageNumbers.length)).map(number => (
                        <button key={number} onClick={()=> paginate(number)} className={`${currentPage ===number ? 'active' : ''}`}> {number}</button>
                    ))}
                     <button onClick={() => paginate(currentPage +1)} disabled={currentMovies.length < perpage} >
                        Next
                    </button>
                </div>
            )
        }
    
    </div>
    
        </>
   }
