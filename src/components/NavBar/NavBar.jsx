import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import './NavBar.css'

function NavBar() {

  return (
    <div className="NavBar">

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" style={{ display: 'flex' }}>
            <img
              alt=""
              src="https://res.cloudinary.com/dtetsfefb/image/upload/v1715328941/tikcet_logo_vpfref.png"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <p>IronBuster</p>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="link">
                <Nav.Link as="span">Home</Nav.Link>
              </Link>
              <Link to="/movies" className="link">
                <Nav.Link as="span">Movies</Nav.Link>
              </Link>
              <Link to='/bookings' className="link">
                <Nav.Link href="#link" as="span">Bookings</Nav.Link>
              </Link>
              <Link to="/about" className="link">
                <Nav.Link href="#link" as="span">About</Nav.Link>
              </Link>
            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
  )

}

export default NavBar