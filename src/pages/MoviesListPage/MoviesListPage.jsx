import { Button, Container } from "react-bootstrap"
import MoviesList from "../../components/MoviesList/MoviesList"
import { Link } from "react-router-dom"

function MoviesListPage() {

  return (
    <div className="MoviesListPage">
      <h1 className="text-center mt-5">Our Collection</h1>
      <hr className="mx-auto d-block w-50" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
      <Container className="text-center mt-5">
        <Link to={'/movies/new'} style={{ textDecoration: 'none' }}>
          <Button className="btn btn-primary">Create New Movie</Button>
        </Link>
      </Container>
      <MoviesList />
    </div >
  )

}

export default MoviesListPage