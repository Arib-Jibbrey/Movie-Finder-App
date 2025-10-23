import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/search.jsx"
import React,{useState, useEffect} from "react"
import Loading from "./components/loading.jsx"
import MovieCard from "./components/moviecard.jsx"
import MoviePage from "./components/moviePage.jsx"
import {API_BASE_URL, API_OPTIONS} from "./api-config.js"

function Home() {
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

  //redering the home page
  return (
   
    <main className="pl-5 pr-5 w-full min-h-screen absolute z-0">
        <header className="center-items">
          
          <div className=" h-[350px] md:h-[400px] overflow-hidden"><img src="../public/hero-img.png" className="object-cover"/></div>
          <h1 className="font-bold font-sans text-4xl pt-0 pb-10 text-center text-white">Find Your Favourite <span className="text-gradient">Movies</span> without the hassle</h1>
        </header>        
        <Search searchText={searchText} setSearchText = {setSearchText}/>
        <p className="text-white text-center">{searchText}</p>

        <section>
          <h2 className="text-white font-medium text-2xl" >All Movies:</h2>
          <div>
              {isLoading ? 
              <Loading /> : 
              errorMessage ? <p className="text-red-500">{errorMessage}</p> :
              <div className="flex flex-wrap gap-0 justify-center">
              {movieList.map((movie)=>(<MovieCard key={movie.id} movie={movie}/>))}
              </div>
}
          </div>

        </section>
    </main>
  
  )
}

function App(){
  return(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movie/:id" element={<MoviePage/>}/>
      </Routes>
    </BrowserRouter>
    
  )


}


export default App
