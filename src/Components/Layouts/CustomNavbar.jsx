import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import '../../App.css'

function CustomNavbar() {
  const { currentUser} = useAuth();
  const navigate = useNavigate();

  const getHomeLink = () => {
    navigate ('/');
  };

  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
      <Navbar.Brand as={Link} to={getHomeLink()} className="d-flex align-items-center">
          <h2 style={{color: '#ffc107', textAlign: 'center'}}>TLBC</h2>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
