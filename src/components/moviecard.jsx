import {useNavigate} from "react-router-dom"

function MovieCard(prop){
    const movie = prop.movie;
    const imgURL = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
    const navigate = useNavigate();


    function handleClick(){
        navigate(`/movie/${movie.id}`);
        
        
        
       
    }

    return (
        <div className="movie-card justify-center items-center relative" onClick={handleClick}>
            {imgURL ?
            <div className="w-full h-80 mb-3"><img className="movie-poster" src= {imgURL} /></div> :
            <img className="" src="/placeholder.png" alt="no poster available"/>}
            <h1 className="movie-title pb-3">{movie.title}</h1>

            <div className=" movie-insights bottom-4 "><img className="w-4 h-4" src="../public/star.png"/><div className="text-white font-bold">{(movie.vote_average/2).toFixed(1 )}</div><span className="dot"></span><div className="font-medium">{movie.original_language}</div><span className="dot"></span><div className="font-medium">{(movie.release_date)?.split("-")[0]}</div></div>
        </div>)
        

}

export default MovieCard