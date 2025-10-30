const Search = (prop) => {
  const searchIconSrc = `${import.meta.env.BASE_URL || '/'}search.png`

  function handleSearchText(e){
    prop.setSearchText(e.target.value)
  }

  return (
    <div className="flex flex-row justify-center items-center border rounded-2xl w-64 mx-auto p-3.5 border-[rgb(111,111,111)]">
        <img src={searchIconSrc} className="mr-5"/>
        <input type="text" placeholder="Search for Movie" className="outline-none text-white" onChange={handleSearchText}/>
    </div>
  )
}

export default Search
