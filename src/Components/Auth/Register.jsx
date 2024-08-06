import React, { useState } from "react";
import { collection, doc, addDoc, setDoc } from "firebase/firestore";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import {  db } from "../Services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    // password: "",
    address: "",
    gender: "",
    church: "",
    officeNow: "",
    officeApply: "",
  });


  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    //First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Phone validation (allowing for international numbers)
    const phoneRegex = /^\+?[0-9\s\-()]+$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    // if (!formData.password) {
    //   newErrors.password = "Password is required";
    // }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.church) {
      newErrors.church = "Church is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.officeNow.trim()) {
      newErrors.officeNow = "Please fill in the required information";
    }

    if (!formData.officeApply.trim()) {
      newErrors.officeApply = "Please fill in the required information";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({});
    setSuccessMessage("");
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
      // Add a new document to the "applications" collection
      const docRef = await addDoc(collection(db, "applications"), {
        ...formData,
        timestamp: new Date(),
      });

      console.log("Submission successful with ID: ", docRef.id);
      setSuccessMessage("Application form submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        church: "",
        officeNow: "",
        officeApply: "",
      });
    } catch (error) {
      console.error("Error during submission:", error);
      setError({ form: `Submission failed: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow">
            <Card.Body>
              <h2
                className="text-center mb-4"
                style={{ color: "#A37B05", fontWeight: "bold" }}
              >
                Application Form
              </h2>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {error.form && <Alert variant="danger">{error.form}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                    />
                    {error.firstName && (
                      <Form.Text className="text-danger">
                        {error.firstName}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                    />
                    {error.lastName && (
                      <Form.Text className="text-danger">
                        {error.lastName}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                    />
                    {error.phone && (
                      <Form.Text className="text-danger">
                        {error.phone}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                    />
                    {error.email && (
                      <Form.Text className="text-danger">
                        {error.email}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your Address (City, State, Country)"
                    required
                  />
                  {error.address && (
                    <Form.Text className="text-danger">
                      {error.address}
                    </Form.Text>
                  )}
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} md={6} controlId="church">
                    <Form.Label>Church</Form.Label>
                    <Form.Control
                      type="text"
                      name="church"
                      value={formData.church}
                      onChange={handleChange}
                      placeholder="Church"
                      required
                    />
                    {error.church && (
                      <Form.Text className="text-danger">
                        {error.church}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} md={6} controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                     <option value="">Select your Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                    {error.gender && (
                      <Form.Text className="text-danger">
                        {error.gender}
                      </Form.Text>
                    )}
                  </Form.Group>

                </Row>
                <Form.Group className="mb-3" controlId="officeNow">
                  <Form.Label>
                    List your current position(s) (if any)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="officeNow"
                    value={formData.officeNow}
                    onChange={handleChange}
                    placeholder="Enter your current positions"
                    required
                  />
                  {error.officeNow && (
                    <Form.Text className="text-danger">
                      {error.officeNow}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="officeApply">
                  <Form.Label>
                    What offices are you applying for? <br />
                    (If you are interested in more than one office, specify each
                    here. Clearly separate them with a comma (,) or write on a
                    new line.)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="officeApply"
                    value={formData.officeApply}
                    onChange={handleChange}
                    placeholder="Enter the office(s) you are applying for"
                    required
                  />
                  {error.officeApply && (
                    <Form.Text className="text-danger">
                      {error.officeApply}
                    </Form.Text>
                  )}
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#ffc107",
                      color: "black",
                      fontWeight: "bolder",
                      border: "none",
                    }}
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
                {error.form && <p className="text-danger mt-2">{error.form}</p>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
