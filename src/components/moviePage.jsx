import { useParams } from "react-router-dom"
import React,{use, useEffect, useState} from "react"
import {API_BASE_URL, API_OPTIONS} from "../api-config.js"
import Loading from "./loading.jsx";
import {useNavigate} from "react-router-dom"
const starIconSrc = `${import.meta.env.BASE_URL || '/'}star.png`
const backIconSrc = `${import.meta.env.BASE_URL || '/'}back-icon-vector.jpg`


function MoviePage(){
    const params = useParams();
    const id = params.id;
    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();
    
    
    const imgURL = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
    function handleClickBack(){
        navigate('/');}

    const fetchMovieDetails = async()=>{
        setLoading(true);
        try{
            const endpoint = `${API_BASE_URL}/movie/${id}`
            const response = await fetch(endpoint, API_OPTIONS)
            if(!response.ok){
                setLoading(false)
                setErrorMessage('Something went wrong :(')
                throw new Error('Failed to fetch movie details: failed to fetch from endpoint');
            }
            const movie = await response.json()
            setMovie(movie)
            console.log(movie);

        }catch(error){console.error(`Error fetching movie details: ${error}`); setErrorMessage('something went wrong :(')}
         setLoading(false);
    }
   

    useEffect(
        ()=>{
            fetchMovieDetails()
        },[]
    )
    

    return(
        
        <main className="px-5 pt-5 w-full min-h-screen absolute z-0">
            <img className="back-icon" src={backIconSrc} alt="" onClick={handleClickBack} />
            {loading? <Loading/> : 
            errorMessage ? <p className="text-red-500">{errorMessage}</p> : 
            <div className="p-5">
                <h1 className="text-white font-bold text-3xl mb-5">{movie.title} [{movie.release_date?.split("-")[0]}]</h1>
                <div className="flex flex-row">
                    <img src={imgURL}/>
                    <div className=" ml-5 text-white font-medium pl-3 flex flex-col flex-1 justify-center">
                        <div>Vibe: {movie.genres ? <span>{movie.genres.map((genre)=>(<span key={genre.id}>{genre.name}, </span>))}</span> : 'N/A'}</div>
                        <div>Origin: {movie.origin_country}</div>
                        <div>Lanuage: {movie.original_language}</div>
                        <div>R-Rated? {movie.adult? <span className="text-red-500">yes</span>: <span className="text-green-500">No</span>}</div>
                        <div>Released on: {movie.release_date}</div>
                    </div>
                </div>
               
                <div className="mt-10 text-justify">
                    <h1 className="text-white font-medium mb-5">{movie.tagline||"No tagline available"}</h1>
                    <h2 className="text-white">{movie.overview||"No description available"}</h2>
                    <div className=" movie-insights mt-10"><img className="w-4 h-4" src={starIconSrc}/><div className="text-white font-bold">{(movie.vote_average/2).toFixed(1 )}</div><span className="dot"></span><div className="font-medium">{movie.original_language}</div><span className="dot"></span><div className="font-medium">{(movie.release_date)?.split("-")[0]}</div></div>
                </div>
            </div>
            }   
        </main>

    )

}
export default MoviePage