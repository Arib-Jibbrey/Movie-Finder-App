const Search = (prop) => {
  const searchIconSrc = `${import.meta.env.BASE_URL || '/'}search.png`

  function handleSearchText(e){
    prop.setSearchText(e.target.value)
  }

  return (
    <div className="flex flex-row items-center border rounded-2xl w-65 border-[rgb(111,111,111)] mx-auto m-10">
        <img src={searchIconSrc} className="ml-3"/>
        <input type="text" placeholder="Search for Movie" className="outline-none text-white p-3 flex-1" onChange={handleSearchText}/>
    </div>
  )
}

export default Search
