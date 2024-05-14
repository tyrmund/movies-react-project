import MovieEditForm from "../../components/MovieEditForm/MovieEditForm"

function MovieEditPage() {

  return (
    <div className="MovieEditPage">
      <h1 className="text-center mt-5">Edit a Movie</h1>
      <hr className="mx-auto d-block w-50" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
      <MovieEditForm />
    </div>
  )

}

export default MovieEditPage