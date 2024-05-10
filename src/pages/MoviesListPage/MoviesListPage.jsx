import MoviesList from "../../components/MoviesList/MoviesList"

function MoviesListPage() {

    return (
        <div className="MoviesListPage">
            <h1 className="text-center">Nuestra colección</h1>
            <hr className="mx-auto d-block w-50" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
            <MoviesList />
        </div >
    )

}

export default MoviesListPage