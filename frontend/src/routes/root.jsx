import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Root() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" as="ul">
            <Nav.Item as="li">
              <Link to="/movies">Movies</Link>
            </Nav.Item>
            <Nav.Item as="li">
              {user ? (
                <Nav.Link as="button" onClick={logout}>
                  Logout User
                </Nav.Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
    </>
  );
}

export default Root;
