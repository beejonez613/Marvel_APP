import './App.css';
import Header from './Header'
import CharacterTable from './CharacterTable'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Search from './Search'

const hash = "b4b5a72344f284a95293f19bba122cfa"

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetch = async () => {
      if (query === '') {
        // checking if favorites array is empty or does not exist
        if (localStorage.getItem('favorites') === '[]' || !localStorage.getItem('favorites')) {
          localStorage.setItem('favorites', '[]')
          const result = await axios(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=72583f87ea912e95ff10ee5722492b0c&hash=${hash}`)
          console.log(result.data.data.results)
          setItems(result.data.data.results)
          setLoading(false)
        } else {
          let favorite = JSON.parse(localStorage.getItem('favorites'))
          setItems(favorite)
          setLoading(false)
        }


      } else {
        const result = await axios(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=72583f87ea912e95ff10ee5722492b0c&hash=${hash}`)
        console.log(result.data.data.results)
        setItems(result.data.data.results)
        setLoading(false)
      }

    }

    fetch()
  }, [query])

  return (
    <div className="container">
      <Header />
      <Search search={(q) => setQuery(q)}></Search>
      <CharacterTable items={items} isLoading={isLoading} />
    </div>
  );
}

export default App;