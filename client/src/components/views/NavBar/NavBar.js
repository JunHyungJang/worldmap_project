import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  
  const [isLogin, setisLogin] = useState("")

  const onLogout = () => {
    sessionStorage.removeItem('user_id')
    document.location.href = '/'
  }

  useEffect (() => {
    if (sessionStorage.getItem('user_id') != null){
      setisLogin(sessionStorage.getItem('user_id'))
    }
    // console.log(isLogin, "navbarislogin")
  })
  
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Jun's Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/upload">Upload</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <div>
            {
              isLogin !== ""
              ? 
              <Nav>
              <Nav.Link onClick = {onLogout}>Logout</Nav.Link>
              </Nav>
              : 
              <Nav>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link eventKey={2} href="/login">
                Login
              </Nav.Link>
              </Nav>
            }
            
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
