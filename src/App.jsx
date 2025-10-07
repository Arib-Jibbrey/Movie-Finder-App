import Search from "./components/search.jsx"
import React,{useState, useEffect} from "react"
import Loading from "./components/loading.jsx"
import MovieCard from "./components/moviecard.jsx"

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
    method:'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${API_KEY}`
    }
   }


function App() {
  const [searchText, setSearchText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setISLoading] = useState(false)
  const [movieList, setMovieList] = useState([])

  const fetchMovies = async()=>{
    setISLoading(true)
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)
      if(!response.ok){
        setISLoading(false)
        setErrorMessage('Something went wrong :(')
        throw new Error('Failed to fetch movies: failed to fetch from endpoint');
      }
      const data = await response.json()
      
      setMovieList(data.results)
      console.log(movieList);
      
      
      
      
      
    }catch(error){console.error(`Error fetching Movies. Json() failed:${error}`); setErrorMessage('something went wrong :(')}
    setISLoading(false)
  }

  useEffect(
    ()=>{
      fetchMovies()
    },[]
  )

  

  return (
    <div className="p-0 m-0 bg-img bg-black min-h-screen">
    <main className="pl-5 pr-5">
        <header className="center-items">
          
          <div className=" h-[350px] md:h-[400px] overflow-hidden"><img src="../public/hero-img.png" className="object-cover"/></div>
          <h1 className="font-bold font-sans text-4xl pt-0 pb-10 text-center text-white">Find Your Favourite <span className="text-gradient">Movies</span> without the hassle</h1>
        </header>        
        <Search searchText={searchText} setSearchText = {setSearchText}/>
        <p className="text-white text-center">{searchText}</p>

        <section>
          <h2 className="text-white font-medium text-2xl" >All Movies</h2>
          <div>
              {isLoading ? 
              <Loading /> : 
              errorMessage ? <p className="text-red-500">{errorMessage}</p> :
              <div className="flex flex-wrap gap-4 justify-center">
              {movieList.map((movie)=>(<MovieCard key={movie.id} movie={movie} />))}
              </div>
}
          </div>

        </section>
    </main>
    </div>
  )
}

export default App
