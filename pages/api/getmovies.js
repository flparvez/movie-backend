
import { mongooseConnect } from "@/lib/mongoose";
import { Movie } from "@/models/Movie";

// Api For Fetching Data
export default async function handle(req, res) {
  // If Authenticated, connect to mongoDB
  await mongooseConnect();

  const { method } = req;

//   When Post Request
  if (method === "POST") {
    const {
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
      status,
    } = req.body;

    const movieData = await Movie.create({
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
      status,
    });
    res.json(movieData)
  }

//   when get req
  if (method === 'GET') {
    if (req.query?.id) {
        res.json(await Movie.findById(req.query.id))
    }else{
        res.json(( await Movie.find()).reverse())
    }
  }
// when Update Req


if (method === 'PUT') {
    const {
        _id,
        title,    
        slug,
        bgposter,
        smposter,
        titleCategory,
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
        status,
      } = req.body;
      await Movie.updateOne({_id},{
        title,
        slug,
        bgposter,
        smposter,
        titleCategory,
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
        status,
      });
      res.json(true);
}

// when Delete Req

if (method==='DELETE') {
    if (req.query?.id) {
        await Movie.deleteOne({_id:req.query?.id});
        res.json(true)
    }
}

}
