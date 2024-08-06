import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from "react-bootstrap";
import { Book } from "lucide-react";
import HeroSection from '../../assets/Images/Herosection.jpg'
import '../Styles/Home.css'
import Register from '../Auth/Register';
import CustomNavbar from './CustomNavbar';
import SupportForm from "../Layouts/Support";
import Footer from './Footer'


const HomePage = () => {
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleBackToHome = () => {
    setShowRegisterForm(false);
  };


  return (
    <>
      <CustomNavbar />
  

      <div
        className="hero-section position-relative text-white"
        style={{
          backgroundImage: `url(${HeroSection})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 56px)", // Adjust this value based on your navbar height
          paddingTop: "56px", // Add padding to push content below navbar
        }}
      >
         <Container fluid className="h-100">
          <Row className="justify-content-center align-items-center h-100">
          <Col xs={12} md={10} lg={8} xl={6}>
          <div className="hero-content text-center">
                {!showRegisterForm && (
                    <>
                      <div className="mb-4">
                        <Book size={0} className="text-warning" />
                      </div>
                      <h3 className="display-4 fw-bold mb-3" style={{color: '#ffc107'}}>
                        Welcome to
                        {/* <br /> */}
                        TLBC Office Application Form
                      </h3>
                      <p
                        className="lead mb-4"
                        style={{ color: "white", fontStyle: "italic" }}
                      >
                        This is a portal for the Leaders of TLBC International
                        {/* <br /> */}
                        Please fill the form with accurate information.
                      </p>

                      <div
                        className={`button-container ${
                          buttonsVisible ? "fade-in" : ""
                        }`}
                        style={{ zIndex: 1, marginBottom: "2rem" }}
                      >
                        <Button
                          variant="warning"
                          size="lg"
                          className="w-50 custom-button mb-2"
                          style={{
                            fontWeight: "bolder",
                            fontSize: "1.25em",
                            color: "black",
                          }}
                          onClick={handleRegisterClick}
                        >
                          Fill the Form
                        </Button>
                      </div>

                    </>
                  )}

                {showRegisterForm && (
                  <div className="form-container">
                    <Register />
                    <Button
                      variant="link"
                      className="text-white back-to-home"
                      onClick={handleBackToHome}
                    
                    >
                      Back to Home
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>

      </div>

      <Footer />
    </>
  );
};
export default HomePage;