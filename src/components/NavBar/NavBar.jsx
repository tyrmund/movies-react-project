import SearchBar from "../SearchBar/SearchBar"
import { Navbar, Container, Nav, Form, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import './NavBar.css'
import searchImage from './../../assets/lupa-search.png'
import { useEffect, useState } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL


function NavBar() {

  const [expanded, setExpanded] = useState(false)



  return (
    <div className="NavBar">

      <Navbar expand="lg" className="bg-body-tertiary" expanded={expanded}>
        <Container>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand style={{ display: 'flex' }}>
              <img
                alt=""
                src="https://res.cloudinary.com/dtetsfefb/image/upload/v1715328941/tikcet_logo_vpfref.png"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              <p>IronBuster</p>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="link" onClick={() => setExpanded(false)}>
                <Nav.Link as="span">Home</Nav.Link>
              </Link>
              <Link to="/movies" className="link" onClick={() => setExpanded(false)}>
                <Nav.Link as="span">Movies</Nav.Link>
              </Link>
              <Link to='/bookings' className="link" onClick={() => setExpanded(false)}>
                <Nav.Link href="#link" as="span">Bookings</Nav.Link>
              </Link>
              <Link to="/about" className="link" onClick={() => setExpanded(false)}>
                <Nav.Link href="#link" as="span">About</Nav.Link>
              </Link>
            </Nav>

            <SearchBar />

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
  )

}

export default NavBar