import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { useState } from 'react'

const API_URL = "http://localhost:5000"

function App() {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    loadAllMovies()
  }, [])

  const loadAllMovies = () => {
    axios
      .get(`${API_URL}/movies`)
      .then(({ data }) => setMovies(data))
      .catch(err => console.log(err))
  }

  return (
    <div className='App'>
      {
        movies.map((movie) => <h1>{movie.title}</h1>)
      }
    </div>
  )
}

export default App