import { getRatingColor } from "../../utils/movie.utils"

function MovieCard({ id, title, image, director, rating }) {

  const ratingColor = getRatingColor(rating)

  return (
    <div className="MovieCard mt-5">
      <img
        src={image}
        alt={title}
        className="w-auto h-100 mx-auto d-block rounded"
        style={{ maxHeight: '400px' }} />
      <div className="MovieCardInfo">
        <h1 className="text-center mt-3 mb-3 fs-3">{title}</h1>
        <p className="text-center fs-6"><b>Director:</b> {director}</p>
        <p
          className={`text-center fs-6 rounded ${ratingColor}`}
          style={{
            color: 'white',
            display: 'inline-block',
            padding: '3px',
            width: '100px',
            marginLeft: 'calc(50% - 50px)'
          }}>
          <b>Rating:</b> {rating}
        </p>
      </div>
    </div>
  )

}

export default MovieCard