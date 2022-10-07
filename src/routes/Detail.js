import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  // 현재 페이지의 마지막 부분을 id로 받아온다.
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovie = async () => {
    const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie()
  },[]);

  return (
    <>
      {loading ? (
        "loading..."
      ) : 
        <div style={{margin: '100px'}}>
          <h1>{movie.title}</h1>
          <div>
            <img src={movie.medium_cover_image}></img>
          </div>
          <p>year:{movie.year}</p>
          <p>runtime: {movie.runtime}</p>
          <p>language: {movie.language}</p>
          <p>genres: {movie.genres}</p>
        </div>
      }
    </>
  );
}