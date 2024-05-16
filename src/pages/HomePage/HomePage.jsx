import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL

function HomePage() {

  const [poster, setPoster] = useState([])

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


        // const randomMovie1 = data[Math.floor(Math.random() * data.length)]
        // const randomMovie2 = data[Math.floor(Math.random() * data.length)]
        // const randomMovie3 = data[Math.floor(Math.random() * data.length)]
        // let randomPull = data[Math.floor(Math.random() * data.length)]

        // randomPull = data[Math.floor(Math.random() * data.length)]
        // while (randomPull === randomMovie1) {
        //     randomPull = data[Math.floor(Math.random() * data.length)]
        // }

        // randomPull = data[Math.floor(Math.random() * data.length)]
        // while (randomPull === randomMovie1 && randomPull === randomMovie2) {
        //     randomPull = data[Math.floor(Math.random() * data.length)]
        // console.log(randomizedArr)
        // }

        setPoster(randomizedArr)


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

        {poster.length > 0 &&

          <Container >
            <Row className='justify-content-between'>
              <Col md={{ span: 3 }}>

                <div className='p-3 mb-5 bg-white rounded' style={{
                  border: '1px solid rgba(239, 239, 240, 0.9)',
                  borderRadius: '10px', boxShadow: '2px 2px 2px 1px gainsboro'
                }}>
                  <Link to={`/movies/${poster[0].id}`}>
                    <img
                      style={{ height: 350, objectFit: 'cover' }}
                      src={poster[0].image}
                      alt="random-poster"
                      className="rounded mx-auto mt-5"
                    />
                  </Link>
                  <p className='text-center mt-3' style={{ fontStyle: 'italic', fontSize: '20px' }}>
                    New Addition
                  </p>
                </div>

              </Col>

              <Col md={{ span: 3 }}>
                <div className='p-3 mb-5 bg-white rounded' style={{
                  border: '1px solid rgba(239, 239, 240, 0.9)',
                  borderRadius: '10px', boxShadow: '2px 2px 2px 1px gainsboro'
                }}>
                  <Link to={`/movies/${poster[1].id}`}>
                    <img
                      style={{ height: 350, objectFit: 'cover' }}
                      src={poster[1].image}
                      alt="random-poster"
                      className="rounded mx-auto   mt-5"
                    />
                  </Link>
                  <p className='text-center mt-3' style={{ fontStyle: 'italic', fontSize: '20px' }}>
                    Suggested for you
                  </p>
                </div>

              </Col>

              <Col md={{ span: 3 }}>
                <div className='p-3 mb-5 bg-white rounded' style={{
                  border: '1px solid rgba(239, 239, 240, 0.9)',
                  borderRadius: '10px', boxShadow: '2px 2px 2px 1px gainsboro'
                }}>
                  <Link to={`/movies/${poster[2].id}`}>
                    <img
                      style={{ height: 350, objectFit: 'cover' }}
                      src={poster[2].image}
                      alt="random-poster"
                      className="rounded mx-auto   mt-5"
                    />
                  </Link>
                  <p className='text-center mt-3' style={{ fontStyle: 'italic', fontSize: '20px' }}>
                    Popular right now
                  </p>
                </div></Col>
            </Row>
          </Container>
        }
      </Container>
    </div>
  )

}

export default HomePage