import React from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "components/movie/MovieCard";
import { apiKey, fetcher, tmdbAPI } from "config";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);

  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>

      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.map((item) => (
            <span
              key={item.id}
              item={item}
              className="px-4 py-2 border rounded-lg text-primary border-primary"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-sm leading-relaxed text-center max-w-[600px] mx-auto text-white mb-10">
        {overview}
      </p>
      <Link to={`/book/${movieId}`}>
        <div className="flex items-center justify-center mb-10 gap-x-5">
          <button className="flex items-center p-5 bg-purple-500 border rounded-lg outline-none ">
            Booking
          </button>
        </div>
      </Link>
      <MovieData type="credits"></MovieData>
      <MovieData type="videos"></MovieData>
      <MovieData type="similar"></MovieData>

      {/* <MovieCredits></MovieCredits>
      <MovieTrailer></MovieTrailer>
      <MovieSimilar></MovieSimilar> */}
    </div>
  );
};

function MovieData({ type = "videos" }) {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="mb-10 text-3xl text-center text-white">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-xl font-medium text-white">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos") {
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div className="" key={item.id}>
                <h3 className="inline-block p-3 mb-5 text-xl font-medium text-white bg-secondary">
                  {item.name}
                </h3>
                <div key={item.id} className="w-full aspect-video">
                  <iframe
                    width="962"
                    height="541"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-fill w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="mb-10 text-3xl font-medium text-white">
            Similar Movies
          </h2>
          <div className="movie-list ">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    }
    return null;
  }
}

// function MovieCredits() {
//   const { movieId } = useParams();
//   const { data, error } = useSWR(
//     tmdbAPI.getMovieMeta(movieId, "credits"),
//     fetcher
//   );
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast || cast.length <= 0) return null;

//   return (
//     <div className="py-10">
//       <h2 className="mb-10 text-3xl text-center text-white">Casts</h2>
//       <div className="grid grid-cols-4 gap-5">
//         {cast.slice(0, 4).map((item) => (
//           <div className="cast-item" key={item.id}>
//             <img
//               src={tmdbAPI.imageOriginal(item.profile_path)}
//               alt=""
//               className="w-full h-[350px] object-cover rounded-lg mb-3"
//             />
//             <h3 className="text-xl font-medium text-white">{item.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieTrailer() {
//   const { movieId } = useParams();
//   const { data, error } = useSWR(
//     tmdbAPI.getMovieMeta(movieId, "videos"),
//     fetcher
//   );
//   if (!data) return null;
//   //   console.log("data Trailer", data);
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   //   console.log("result", results);
//   return (
//     <div className="py-10">
//       <div className="flex flex-col gap-10">
//         {results.slice(0, 2).map((item) => (
//           <div className="" key={item.id}>
//             <h3 className="inline-block p-3 mb-5 text-xl font-medium text-white bg-secondary">
//               {item.name}
//             </h3>
//             <div key={item.id} className="w-full aspect-video">
//               <iframe
//                 width="962"
//                 height="541"
//                 src={`https://www.youtube.com/embed/${item.key}`}
//                 title="YouTube video player"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="object-fill w-full h-full"
//               ></iframe>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieSimilar() {
//   const { movieId } = useParams();
//   const { data, error } = useSWR(
//     tmdbAPI.getMovieMeta(movieId, "similar"),
//     fetcher
//   );
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   console.log("data Similar", data);
//   return (
//     <div className="py-10">
//       <h2 className="mb-10 text-3xl font-medium text-white">Similar Movies</h2>
//       <div className="movie-list ">
//         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
//           {results.length > 0 &&
//             results.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MovieCard item={item}></MovieCard>
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

export default MovieDetailPage;
