function MovieCard(prop){
    const movie = prop.movie;
    const imgURL = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;

    return (
        <div className="movie-card justify-center items-center">
            {imgURL ?
            <img src= {imgURL} /> :
            <img className="" src="../public/placeholder.png"/>} //testing 1 2 3 
        </div>)
        

}

export default MovieCard