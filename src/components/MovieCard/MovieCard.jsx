


function MovieCard({ id, title, image, description }) {



    return (
        <div className="MovieCard">
            <img src={image} alt={title} />
            <h1>{title}</h1>
            <p>{description}</p>

        </div>
    )

}

export default MovieCard