import { Col, Container, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL

function HomePage() {

  const [poster, setPoster] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRandomPoster()
  }, [])

  const loadRandomPoster = () => {
    axios
      .get(`${API_URL}/movies`)
      .then(({ data }) => {

        const randomizedArr = []
        const allMovies = [...data]
        let randomIndex
        let randomMovie

        for (let i = 0; i < 3; i++) {
          randomIndex = Math.floor(Math.random() * allMovies.length)
          randomMovie = allMovies[randomIndex]
          randomizedArr.push(randomMovie)
          allMovies.splice(randomIndex, 1)
        }

        setPoster(randomizedArr)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }


  return (
    <div className="HomePage">

      <Container className='mt-2 mx-auto'>
        <h1 className='text-center mt-5' style={{ fontSize: '60px' }}>Welcome to Ironbuster</h1>
        <hr className="mx-auto " style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 10)' }} />
        <h2
          className='text-center mt-3 mb-5'
          style={{ fontSize: '20px', fontStyle: 'italic' }}
        >The largest movie collection of Ironhack Matadero
        </h2>

        {isLoading ? <Container className='text-center fs-1 mt-5'>Loading...</Container> :

          <Container >
            <Row className='justify-content-between'>
              <Col md={{ span: 3 }}>

                <Card >
                  <Link to={`/movies/${poster[0].id}`}>
                    <Card.Img
                      variant="top"
                      style={{ height: 350, objectFit: 'cover' }}
                      src={poster[0].image}
                      alt="random-poster"
                    />
                  </Link>
                  <Card.Body>
                    <Card.Text className='text-center mt-3' style={{ fontStyle: 'italic', fontSize: '20px' }}>
                      New Addition
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>

              <Col md={{ span: 3 }}>
                <Card>
                  <Link to={`/movies/${poster[1].id}`}>
                    <Card.Img
                      variant='top'
                      style={{ height: 350, objectFit: 'cover' }}
                      src={poster[1].image}
                      alt="random-poster"
                    />
                  </Link>
                  <Card.Body>
                    <Card.Text className='text-center mt-3' style={{ fontStyle: 'italic', fontSize: '20px' }}>
                      Suggested for you
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>

              <Col md={{ span: 3 }}>
                <Card>
                  <Link to={`/movies/${poster[2].id}`}>
                    <Card.Img
                      variant='top'
                      style={{ height: 350, objectFit: 'cover' }}
                      src={poster[2].image}
                      alt="random-poster"
                    />
                  </Link>
                  <Card.Body>
                    <Card.Text className='text-center mt-3' style={{ fontStyle: 'italic', fontSize: '20px' }}>
                      Popular right now
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        }
      </Container>
    </div>
  )

}

export default HomePage