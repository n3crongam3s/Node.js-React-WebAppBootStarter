import React from 'react';
import './components.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import Data from "../pages/data.js";

function AppNavbar() {
  return (
    <Navbar expand="lg" bg="body-tertiary" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">Template</Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/data">
                Users
              </Nav.Link>
              <NavDropdown title="Mais" id="offcanvasNavbarDropdown">
                <NavDropdown.Item href="/">Menu 2</NavDropdown.Item>
                <NavDropdown.Item href="/">Menu 3</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="d-flex mt-3 mt-lg-0">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

// export const Navbar = () => {};
export default AppNavbar;
