import { Row, Col, Form, ListGroup } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL


const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [movieResults, setMovieResults] = useState([])
  const [selectedOption, setSelectedOption] = useState(false)


  const handleSelectedOption = (boolean) => {
    // when you click the selected movie, it updates the state of the movies so all the options don't show, it updates the query so there's no text left behind, and it updates the selected option so that it 
    setSelectedOption(boolean)
    setMovieResults([])
    setSearchQuery('')
  }

  const handleQueryChange = e => {

    const { value } = e.target
    setSearchQuery(value)
    setSelectedOption(false)

    value != '' ? getMoviesByTitle(value) : setMovieResults([])
    // this updates the query in the search bar when i's not empty; when it is, it shows nothing because there is no movie being updated (forcing it with ternary)
  }

  const getMoviesByTitle = query => {
    axios
      .get(`${API_URL}/movies?title_like=${query}`)
      .then(({ data }) => setMovieResults(data))
      .catch(err => console.log(err))
  }



  return (
    <div className="SearchBar">
      <Form >
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              value={searchQuery}
              placeholder="Search"
              className="mr-sm-2"
              onChange={handleQueryChange}
            />
          </Col>
        </Row>
      </Form>

      <ListGroup style={{ position: 'absolute' }}>

        {!selectedOption &&            // this makes the search bar selection disappear upon clicking
          movieResults.map(elm => {
            return (
              <ListGroup.Item style={{ zIndex: 100 }} key={elm.id}>
                <Link to={`/movies/${elm.id}`} style={{ textDecoration: 'none', color: 'black' }} onClick={() => handleSelectedOption(true)}>
                  {<img src={elm.image} style={{ width: '40px' }} />} {elm.title}
                </Link>
              </ListGroup.Item>
            )
          })
        }

      </ListGroup>
    </div>
  )
}

export default SearchBar