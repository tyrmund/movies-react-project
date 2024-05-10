import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000'

function HomePage() {

    const [poster, setPoster] = useState('')

    useEffect(() => {
        loadRandomPoster()
    }, [])

    const loadRandomPoster = () => {
        axios
            .get(`${API_URL}/movies`)
            .then(({ data }) => setPoster(data[Math.floor(Math.random() * data.length)].image))
            .catch(err => console.log(err))
    }

    return (
        <div className="HomePage bg-light">
            <Container className='mt-5 mx-auto'>
                <h1 className='text-center mt-5'>Bienvenido a Ironbuster</h1>
                <h2
                    className='text-center mt-5'
                    style={{ fontSize: '15px', fontStyle: 'italic' }}
                >La colección de películas más grande de Ironhack Matadero
                </h2>
                <div className='shadow-lg p-3 mb-5 bg-white rounded'>
                    <img
                        src={poster}
                        alt="random-poster"
                        className="rounded mx-auto d-block w-50 h-50 mt-5"
                    />
                    <p className='text-center font-italic mt-3'>
                        Actualmente disponible en nuestro catálogo
                    </p>
                </div>
            </Container>
        </div>
    )

}

export default HomePage