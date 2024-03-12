import "./index.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons'; 
import { useState } from 'react'; 

function NavBar() {
  const [selectedLanguage, setSelectedLanguage] = useState('EN'); 

  return (
    <Navbar  expand="lg">  
      <Container fluid>   
        <Navbar.Brand href="/">BarberHouse</Navbar.Brand> 
        <Navbar.Toggle aria-controls="navbar-content" className="collapse-button">
          <a href="/" className="ellipsis-icon">
            <FontAwesomeIcon icon={faEllipsis} />
          </a>
        </Navbar.Toggle> 
        <Navbar.Collapse className="justify-content-end">  
          <Nav className="mx-auto"> 
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Services</Nav.Link>
            <Nav.Link href="/">Contacts</Nav.Link>
          </Nav>

          <div className="d-flex icons-container"> 
            <div className="me-3"> 
              <a href="www.instagram.com" className="me-3 instagram-icon"> 
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
            <div> 
              <NavDropdown title={selectedLanguage} id="languageDropdown">
                <NavDropdown.Item onClick={() => setSelectedLanguage('EN')}>EN</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setSelectedLanguage('DK')}>DK</NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
