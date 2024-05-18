import React, { useState, useEffect } from 'react';
import "./index.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  // Effect to add or remove the 'navbar-scrolled' class on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar expand="lg" className={`custom-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <Container fluid>
        <Navbar.Brand href="/">BarberHouse</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Services</Nav.Link>
            <Nav.Link href="/">Contacts</Nav.Link>
          </Nav>
          <a href="https://www.instagram.com" className="instagram-icon">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
