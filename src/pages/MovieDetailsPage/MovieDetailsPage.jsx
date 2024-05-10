import { useParams } from "react-router-dom"
import MovieDetails from "../../components/MovieDetails/MovieDetails"

function MovieDetailsPage() {

    const movieId = useParams()

    return (
        <div className="MovieDetailsPage">
            {/* <MovieDetails /> */} Soy una página de detalles ^-^
        </div>
    )

}

export default MovieDetailsPage