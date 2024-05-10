import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const API_URL = "http://localhost:5000"


function MovieDetailsPage() {

    const [movie, setMovie] = useState()

    const { movieId } = useParams()

    useEffect(() => {
        getOneMovie()
    }, [])

    const getOneMovie = () => {
        axios
            .get(`${API_URL}/movies/${movieId}`)
            .then(({ data }) => setMovie(data))
            .catch(err => console.log(err))
    }

    return (
        <div className="MovieDetailsPage">
            <p>Soy una página de detalles ^-^</p>
        </div>
    )

}

export default MovieDetailsPage