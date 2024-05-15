import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL

function HomePage() {

    const [poster, setPoster] = useState('')

    useEffect(() => {
        loadRandomPoster()
    }, [])

    const loadRandomPoster = () => {
        axios
            .get(`${API_URL}/movies`)
            .then(({ data }) => {
                const randomMovie = data[Math.floor(Math.random() * data.length)]
                setPoster(randomMovie)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="HomePage bg-light">
            <Container className='mt-5 mx-auto'>
                <h1 className='text-center mt-5'>Welcome to Ironbuster</h1>
                <h2
                    className='text-center mt-5'
                    style={{ fontSize: '15px', fontStyle: 'italic' }}
                >The greatest movie collection of Ironhack Matadero
                </h2>
                <div className='shadow-lg p-3 mb-5 bg-white rounded'>
                    <Link to={`/movies/${poster.id}`}>
                        <img
                            src={poster.image}
                            alt="random-poster"
                            className="rounded mx-auto d-block w-50 h-50 mt-5"
                        />
                    </Link>
                    <p className='text-center font-italic mt-3'>
                        Suggested for you
                    </p>
                </div>
            </Container>
        </div>
    )

}

export default HomePage