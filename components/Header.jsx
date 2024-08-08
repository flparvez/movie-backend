import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState,  } from "react";
import { VscThreeBars } from "react-icons/vsc";
import { PiWindowsLogoBold } from "react-icons/pi";
import { IoLanguage, IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";



export default function Header() {



  const { alldata, loading } = useFetchData('/api/getmovies');
  const [searchQuery, setSearchQuery] = useState('');
  const [openSearch, setOpenSearch] = useState(false);

  const handleOpen = () => {
    setOpenSearch(!openSearch);
  };

  const handleClose = () => {
    setSearchQuery('');
    setOpenSearch(false);
  };

  const publishMovies = alldata ? alldata.filter(ab => ab.status === 'publish') : [];
  const filterMovies = searchQuery.trim() === '' ? publishMovies : publishMovies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));



  return  (
    <header className="header">
      <div className="flex flex-sb">
        <div className="headerbard">
          <VscThreeBars />
        </div>
        <div className="searchheaderinput">
          <input type="text" placeholder="Search movies" value={searchQuery} onClick={handleOpen} />
        </div>
        <ul className="flex gap-2">
          <Link href=''><li><PiWindowsLogoBold /></li></Link>
          <Link href=''><li><IoLanguage /></li></Link>
          <Link href=''><li><IoNotificationsSharp /></li></Link>
          <Link href=''><li><MdOutlineStickyNote2 /></li></Link>
          <Link href=''><li><img src="/img/user.png" alt="user" /></li></Link>
        </ul>
      </div>

      {openSearch && (
        <div className="fixedsearchq">
          <input type="text" placeholder="Search Movie" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

          {searchQuery && (
            <div className="searchresultofinput">
              {filterMovies.length > 0 ? (
                filterMovies.slice(0, 10).map(movie => (
                  <div className="siresult" key={movie._id}>
                    <img src={`${movie.smposter}`} alt="movie" />
                    <div className="simovieinfo">
                      <h3>{movie.title}</h3>
                      <div className="udbtns">
                        <Link href={`/movies/edit/${movie._id}`} onClick={handleClose}>Update</Link>
                        <Link href={`/movies/delete/${movie._id}`} onClick={handleClose}>Delete</Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-100 flex flex-center">No Movie Found</div>
              )}
              <button className="closesearch" onClick={handleClose}>X</button>
            </div>
          )}
        </div>
      )}
    </header>
  ) ;
}
