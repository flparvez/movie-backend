
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";



import { useState } from "react";

export default function Movie({
  
  
  _id,
  title: existingtitle,
  slug: existingslug,
  bgposter: existingbgposter,
  smposter: existingsmposter,
  titlecategory: existingtitlecategory,
  description: existingdescription,
  rating: existingrating,
  year: existingyear,
  genre: existinggenre,
  language: existinglanguage,
  subtitle: existingsubtitle,
  duration: existingduration,
  size: existingsize,
  quality: existingquality,
  ytlink: existingytlink,
  category: existingcategory,
  watchonline: existingwatchonline,
  downloadlink: existingdownloadlink,
  status: existingstatus,
 

}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();


  const [title, setTitle] = useState(existingtitle || "");
  const [slug, setSlug] = useState(existingslug || "");
  const [bgposter, setBgposter] = useState(existingbgposter || "");
  const [smposter, setSmposter] = useState(existingsmposter ||"");
  const [titlecategory, setTitleCategory] = useState(existingcategory || "");
  const [description, setDescription] = useState( existingdescription || "");
  const [rating, setRating] = useState( existingrating || "");
  const [year, setYear] = useState(existingyear || "");
  const [genre, setGenre] = useState(existinggenre || "");
  const [language, setLanguage] = useState(existinglanguage || "");
  const [subtitle, setSubtitle] = useState(existingsubtitle || "");
  const [duration, setDuration] = useState(existingduration || "");
  const [size, setSize] = useState(existingsize || "");
  const [quality, setQuality] = useState(existingquality || "");
  const [ytlink, setYtlink] = useState(existingytlink || "");
  const [category, setCategory] = useState(existingcategory || "");
  const [watchonline, setWatchonline] = useState(existingwatchonline || "");

  const [downloadlink, setDownloadlink] = useState(existingdownloadlink || {
    "480p": "",
    "720p": "",
    "1080p": "",
    "4k": "",
  });
  //   not use for database
  const [showInputs, setShowInputs] = useState({
    "480p": false,
    "720p": false,
    "1080p": false,
    "4k": false,
  });

  const [status, setStatus] = useState(existingstatus || "");


// function for create movie

async function createMovie(ev){
  ev.preventDefault();

  const data = {
    
    title,
    slug,
    bgposter,
    smposter,
    titlecategory,
    description,
    rating,
    year,
    genre,
    language,
    subtitle,
    duration,
    size,
    quality,
    ytlink,
    category,
    watchonline,
    downloadlink,
    status}

    if (_id) {
      await axios.put('/api/getmovies', {...data, _id})
    }else{
      await axios.post('/api/getmovies', data)
      console.log(data)
    }
    setRedirect(true)
}


if (redirect) {
  router.push('/')
  return null;
}




  //   download link functionality
  const resolutions = ["480p", "720p", "1080p", "4k"];

  const handleDownloadLinkChange = (resolution, value) => {
    setDownloadlink((prevState) => ({ ...prevState, [resolution]: value }));
  };
  const toggleInputVisibility = (resolution) => {
    setShowInputs((prevState) => ({
      ...prevState,
      [resolution]: !prevState[resolution],
    }));
  };

  //   slug funciton

  const handleslugchange = (ev) => {
    const inputValue = ev.target.value;

    const newSlug = inputValue.replace(/\s+/g, "-");
    setSlug(newSlug);
  };


const genres =['Action','Adventure','Romance','Comedy','Horror','Thriller','Science_Fiction','bangla']
  const categories = ["Bollywood","Hollywood","South","Marvel_Studio","Turkie","Tv_Show","Web_Series",]
  return (
    <>
      <Head>
        <title>Add Movie page</title>
      </Head>

      <form className="addmovieform" onSubmit={createMovie}>

        {/* preview bgpost */}
<div className="w-100 flex gap-3 mt-1">
{
  bgposter? <div className="bgposter flex flex-col w-70 flex-left">
    <img src={bgposter} alt="bg poster" id="prev" />
    <label className="w-100" htmlFor="prev">Background Image Preview</label>
  </div> : null}


{
  smposter? <div className="smposter flex flex-col w-33 flex-left">
    <img src={smposter} alt="sm poster" id="prev" />
    <label className="w-100" htmlFor="prev">Smposter Preview</label>
  </div> : null}

</div>
       
       
        <div className="formdata w-100 flex  flex-sb mt-3 flex-left">
          <div className="w-50 flex flex-col flex-left">
            {/* Movie bg image */}

            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="bgposter"> Background Poster</label>
              <input
                type="text"
                id="bgposter"
                placeholder="Bgposter Image Link"
                value={bgposter}
                onChange={(ev) => setBgposter(ev.target.value)}
              />
            </div>

            {/* Movie title */}

            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="title">Movie Title</label>
              <input
                type="text"
                id="title"
                placeholder="Movie Title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </div>
            {/* Movie Description */}

            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="description">Movie Description</label>
              <textarea
                type="text"
                id="description"
                s
                placeholder="Movie Description"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </div>

            {/* Movie rating */}

            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="title">Movie Rating</label>
              <input
                type="number"
                id="title"
                placeholder="Movie Rating"
                value={rating}
                onChange={(ev) => {
                  let newValue = ev.target.value <= 10.0 ? ev.target.value : 10;
                  newValue = newValue >= 0 ? newValue : 0;
                  setRating(newValue);
                }}
                step="0.1"
                max="10.0"
                min="0"
              />
            </div>

            {/* Movie Duration */}

            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="duration">Movie Duration</label>
              <input
                type="text"
                id="duration"
                placeholder="Movie duration"
                value={duration}
                onChange={(ev) => setDuration(ev.target.value)}
              />
            </div>

            {/* Watchonline Link */}

            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="watchonline">Movie watchonline</label>
              <input
                type="text"
                id="watchonline"
                placeholder="Movie watchonline"
                value={watchonline}
                onChange={(ev) => setWatchonline(ev.target.value)}
              />
            </div>

            {/* Movie Download Link */}

            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="downloadlink">Movie downloadlink</label>
              <div className="flex gap-1">
                <div
                  className={
                    showInputs["480p"] ? "dresolbtn active" : "dresolbtn"
                  }
                  onClick={() => toggleInputVisibility("480p")}
                >
                  {showInputs["480p"] ? "Hide Terabox Link" : "Show Terabox Link"}
                </div>

                <div
                  className={
                    showInputs["720p"] ? "dresolbtn active" : "dresolbtn"
                  }
                  onClick={() => toggleInputVisibility("720p")}
                >
                  {showInputs["720p"] ? "Hide 720p" : "Show 720p"}
                </div>

                <div
                  className={
                    showInputs["1080p"] ? "dresolbtn active" : "dresolbtn"
                  }
                  onClick={() => toggleInputVisibility("1080p")}
                >
                  {showInputs["1080p"] ? "Hide 1080p" : "Show 1080p"}
                </div>

                <div
                  className={
                    showInputs["4k"] ? "dresolbtn active" : "dresolbtn"
                  }
                  onClick={() => toggleInputVisibility("4k")}
                >
                  {showInputs["4k"] ? "Hide 4k" : "Show 4k"}
                </div>
              </div>
              {resolutions ? (
                <>
                  {" "}
                  {resolutions.map((resolution) => (
                    <div key={resolution} className="w-100">
                      {showInputs[resolution] && (
                        <>
                          <input
                            type="text"
                            id={`downloadlink${resolution}`}
                            placeholder={`${resolution} Downlaod link`}
                            value={downloadlink[resolution]}
                            onChange={(ev) =>
                              handleDownloadLinkChange(
                                resolution,
                                ev.target.value
                              )
                            }
                          />
                        </>
                      )}
                    </div>
                  ))}{" "}
                </>
              ) : null}
            </div>

            {/* Movie Status Draft/publish */}

            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="duration">Movie status</label>
              <div className="flex gap-05">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === "draft"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="draft">Darft</label>
              </div>

              <div className="flex gap-05">
                <input
                  type="radio"
                  name="status"
                  value="publish"
                  checked={status === "publish"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="publish">publish</label>
              </div>
            </div>
          </div>

          <div className="w-50 flex flex-col flex-left mb-2 ">
            {/* Movie Small Poster */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="smposter"> Background Small Poster</label>
              <input
                type="text"
                id="smposter"
                placeholder="Bg Small Poster Link"
                value={smposter}
                onChange={(ev) => setSmposter(ev.target.value)}
              />
            </div>

            {/* Movie Slug url */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="slug"> slug</label>
              <input
                type="text"
                id="slug"
                placeholder="url of movie"
                value={slug}
                onChange={handleslugchange}
              />
            </div>

            {/* Movie Relase Year */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="year"> Movie Relase Year</label>
              <input
                type="text"
                id="year"
                placeholder="Movie Relase Years"
                value={year}
                onChange={(ev) => setYear(ev.target.value)}
              />
            </div>

            {/* yt embed link */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="ytlink"> Youtube Embed Link</label>
              <input
                type="text"
                id="ytlink"
                placeholder="Youtube Embed Link"
                value={ytlink}
                onChange={(ev) => setYtlink(ev.target.value)}
              />
            </div>

            {/* Language Of The Movie */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="language">Language</label>
              <select
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                name="language"
                id="language"
              >
                <option value="">Sellect Language</option>
                <option value="Hindi Org">Hindi</option>
                <option value="Bangla">Bangla</option>
                <option value="Dual Audio">Dual Audio</option>
                <option value="English">English</option>
                <option value="Turkie">Turkie</option>
              </select>
            </div>

            {/* Movie Quality */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="quality">Movie quality</label>
              <select
                onChange={(e) => setQuality(e.target.value)}
                value={quality}
                name="language"
                id="quality"
              >
                <option value="">Sellect quality</option>
                <option value="480p || 720p">480p || 720p </option>
                <option value="480p || 720p || 1080p - WEB-DL">
                  480p || 720p || 1080p - WEB-DL
                </option>
                <option value="480p || 720p || 1080p || 2160p - HD">
                  480p || 720p || 1080p || 2160p - HD
                </option>
              </select>
            </div>

            {/* Movie Subtitle */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="subtitle">Movie subtitle</label>
              <select
                onChange={(e) => setSubtitle(e.target.value)}
                value={subtitle}
                name="subtitle"
                id="subtitle"
              >
                <option value="">Sellect Subtitle</option>
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            {/* size */}
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="size"> Movie Size</label>
              <input
                type="text"
                id="size"
                placeholder="380MB || 800MB || 2GB"
                value={size}
                onChange={(ev) => setSize(ev.target.value)}
              />
            </div>

            {/* Movie Title Category */}
            <div className="moviecategory flex flex-sb flex-left">
              <div className="w-50 flex  flex-col  flex-left  mb-2">
                <label>Title Category</label>
                {["Movies", "Series", "shows"].map((cat) => (
                  <div key={cat} className="flex gap-05">
                    <input
                      type="radio"
                      value={cat.toLocaleLowerCase()}
                      name="titlecategory"
                      id={cat.toLocaleLowerCase()}
                      checked={titlecategory === cat.toLocaleLowerCase()}
                      onChange={(e) => setTitleCategory(e.target.value)}
                    />

                    <label htmlFor={cat.toLocaleLowerCase()}> {cat}</label>
                  </div>
                ))}
              </div>

              {/* Movie Category */}

              <div className="w-50 flex  flex-col  flex-left  mb-2">
                <label>Movie Category</label>
                {categories.map((cat) => (
                  <div key={cat} className="flex gap-05">
                    <input
                      type="radio"
                      value={cat.toLocaleLowerCase()}
                      name="category"
                      id={cat.toLocaleLowerCase()}
                      checked={category === cat.toLocaleLowerCase()}
                      onChange={(e) => setCategory(e.target.value)}
                    />

                    <label htmlFor={cat.toLocaleLowerCase()}> {cat}</label>
                  </div>
                ))}
              </div> 
              
              
              {/* Movie Genre */}

              <div className="w-50 flex  flex-col  flex-left  mb-2">
                <label>Movie Genre:</label>
                { genres.map((genreoption) => (
                    <label key={genreoption} className="flex gap-05">
                         <input
                      type="checkbox"
                      value={genreoption.toLowerCase()}
                      
                      checked={genre.includes(genreoption.toLowerCase())}
                      onChange={(e) => {
                        const selectgenre = e.target.value;
                        setGenre((preGenre)=> {
                            if (preGenre.includes(selectgenre)) {
                                return preGenre.filter((genre)=>
                                    genre !== selectgenre )
                            }else{
                                return [...preGenre, selectgenre]
                            }
                        })
                      }
                    }
                    />
                    {genreoption}
                    </label>

               

                  
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* For Save All Data */}
<div className="w-100 mb-2">
    <button type="submit" className="w-100 flex-center"> Save Data</button>


</div>

      </form>
    </>
  );
}
