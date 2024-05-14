import { getRatingColor } from "../../utils/movie.utils"
import { Card, Button } from "react-bootstrap"
import './MovieCard.css'

function MovieCard({ title, image, genre, director, rating }) {

  const ratingColor = getRatingColor(rating)

  return (
    <div className="MovieCard mt-5">
      <Card className="shadow-lg">
        <Card.Img variant="top" src={image} alt={title} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <b>Director:</b> {director}
          </Card.Text>
          <Card.Subtitle
            style={{ color: 'white' }}
            className="mb-2 bg-secondary rounded p-1 opacity-75 d-inline">
            {genre}
          </Card.Subtitle>
          <Card.Text
            style={{ color: 'white' }}
            className={`rating ${ratingColor} p-1 m-2 rounded d-inline`}>
            Rating: {rating}
          </Card.Text>
        </Card.Body>
      </Card >
    </div>
  )

}

export default MovieCard