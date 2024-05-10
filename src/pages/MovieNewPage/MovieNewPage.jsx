import MovieNewForm from "../../components/MovieNewForm/MovieNewForm"

function MovieNewPage() {

    return (
        <div className="MovieNewPage">
            <h1 className="text-center">Agregar una película nueva</h1>
            <hr className="mx-auto d-block w-50" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
            <MovieNewForm />
        </div>
    )

}

export default MovieNewPage