import { Row, Col, Form, ListGroup } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL


const SearchBar = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const [movieResults, setMovieResults] = useState([])

  const handleQueryChange = e => {

    const { value } = e.target
    setSearchQuery(value)

    value != '' ? getMoviesByTitle(value) : setMovieResults([])
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

        {
          movieResults.map(elm => {
            return (
              <ListGroup.Item>
                {elm.title}
              </ListGroup.Item>
            )
          })
        }

      </ListGroup>
    </div>
  )
}

export default SearchBar