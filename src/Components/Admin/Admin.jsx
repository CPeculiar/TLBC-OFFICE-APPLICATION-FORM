import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Form, Button, Table, Modal, Row, Col, Card } from 'react-bootstrap';
import { collection, getDocs, query, where, or } from 'firebase/firestore';
import { db } from '../Services/firebaseConfig';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [submissions, setSubmissions] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [zoneCounts, setZoneCounts] = useState({
    Ekwulobia: 0,
    Owerri: 0,
    Nnewi: 0,
    Awka: 0
  });
  const [genderCounts, setGenderCounts] = useState({
    Male: 0,
    Female: 0
  });

  useEffect(() => {
    fetchAllSubmissions();
  }, []);

  const fetchAllSubmissions = async () => {
    const querySnapshot = await getDocs(collection(db, 'applications'));
    const submissionsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setSubmissions(submissionsData);
    processSubmissionsData(submissionsData);
  };

  const processSubmissionsData = (data) => {
    const zoneData = { Ekwulobia: 0, Owerri: 0, Nnewi: 0, Awka: 0 };
    const genderData = { Male: 0, Female: 0 };

    data.forEach(submission => {
      // Process zone data
      if (submission.zone === 'Ekwulobia zone') zoneData.Ekwulobia++;
      else if (submission.zone === 'Owerri zone') zoneData.Owerri++;
      else if (submission.zone === 'Nnewi zone') zoneData.Nnewi++;
      else if (submission.zone === 'Awka zone') zoneData.Awka++;

      // Process gender data
      if (submission.gender === 'Male') genderData.Male++;
      else if (submission.gender === 'Female') genderData.Female++;
    });

    setZoneCounts(zoneData);
    setGenderCounts(genderData);
  };

  const handleFilter = async () => {
    if (!filterType || !filterValue) return;

    // let q;
    // if (filterType === 'Name') {
    //   q = query(
    //     collection(db, 'applications'),
    //     or(
    //       where('firstName', '>=', filterValue.toLowerCase()),
    //       where('firstName', '<=', filterValue.toLowerCase() + '\uf8ff'),
    //       where('lastName', '>=', filterValue.toLowerCase()),
    //       where('lastName', '<=', filterValue.toLowerCase() + '\uf8ff')
    //     )
    //   );
    let q;
    if (filterType === 'firstName' || filterType === 'lastName') {
      q = query(
        collection(db, 'applications'),
        or(
          where('firstName', '>=', filterValue),
          where('firstName', '<=', filterValue + '\uf8ff'),
          where('lastName', '>=', filterValue),
          where('lastName', '<=', filterValue + '\uf8ff')
        )
      );
    } else {
      q = query(
        collection(db, 'applications'),
        where(filterType, '>=', filterValue),
        where(filterType, '<=', filterValue + '\uf8ff')
      );
    }
    // } else {
    //   q = query(
    //     collection(db, 'applications'),
    //     where(filterType.toLowerCase(), '>=', filterValue.toLowerCase()),
    //     where(filterType.toLowerCase(), '<=', filterValue.toLowerCase() + '\uf8ff')
    //   );
    // }

    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSubmissions(filteredData);
    processSubmissionsData(filteredData);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    doc.setFontSize(18);
    doc.text("Received Data for TLBC Application Forms", 14, 22);
    doc.setFontSize(12);
    doc.autoTable({
      head: [['Name', 'Phone', 'Church', 'Zone', 'Current Office(s)', 'Office Applied for', 'Gender', 'Email', 'Address', 'Submission Date']],
      body: submissions.map(s => [
        `${s.firstName} ${s.lastName}`,
        s.phone,
        s.church,
        s.zone,
        s.officeNow,
        s.officeApply,
        s.gender,
        s.email,
        s.address,
        s.timestamp.toDate().toLocaleString()
      ]),
      startY: 30,
      styles: { cellPadding: 1.5, fontSize: 8 },
      columnStyles: { 
        0: { cellWidth: 35 },
        1: { cellWidth: 20 },
        2: { cellWidth: 25 },
        3: { cellWidth: 20 },
        4: { cellWidth: 40 },
        5: { cellWidth: 40 },
        6: { cellWidth: 15 },
        7: { cellWidth: 30 },
        8: { cellWidth: 25 },
        9: { cellWidth: 25 }
      }
    });
    doc.save("tlbc_form_applications.pdf");
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const barChartData = {
    labels: ['Ekwulobia Zone', 'Owerri Zone', 'Nnewi Zone', 'Awka Zone'],
    datasets: [
      {
        data: [zoneCounts.Ekwulobia, zoneCounts.Owerri, zoneCounts.Nnewi, zoneCounts.Awka],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const pieChartData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        data: [genderCounts.Male, genderCounts.Female],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const HomeContent = () => (
    <>
      <Row className="mb-4">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Total Submissions</Card.Title>
              <Card.Text as="h2">{submissions.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>Ekwulobia Zone</Card.Title>
              <Card.Text as="h2">{zoneCounts.Ekwulobia}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Card bg="info" text="white">
            <Card.Body>
              <Card.Title>Owerri Zone</Card.Title>
              <Card.Text as="h2">{zoneCounts.Owerri}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Card bg="warning" text="dark">
            <Card.Body>
              <Card.Title>Nnewi Zone</Card.Title>
              <Card.Text as="h2">{zoneCounts.Nnewi}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Card bg="danger" text="white">
            <Card.Body>
              <Card.Title>Awka Zone</Card.Title>
              <Card.Text as="h2">{zoneCounts.Awka}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <h3>Zone Distribution</h3>
          <div style={{ height: '400px' }}>
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </Col>
        <Col md={4}>
          <h3>Gender Distribution</h3>
          <div style={{ height: '400px' }}>
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </Col>
      </Row>
    </>
  );

  const ReportsContent = () => (
    <>
      <Form className="mb-4">
        <Form.Group className="mb-3" controlId="filterValue">
          <Form.Control 
            type="text" 
            placeholder={`Enter ${filterType}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="filterType">
          <Form.Select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Select filter type</option>
            <option value="Name">Name</option>
            <option value="church">Church</option>
            <option value="zone">Zone</option>
            <option value="gender">Gender</option>
          </Form.Select>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="filterType">
          <Form.Label>Filter Type</Form.Label>
          <Form.Control as="select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Select Filter Type</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="phone">Phone Number</option>
            <option value="zone">Zone</option>
            <option value="officeApply">Office Applied For</option>
            <option value="gender">Gender</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={handleFilter} className="me-2 mb-2">
          Apply Filter
        </Button>
        <Button variant="success" onClick={fetchAllSubmissions} className="me-2 mb-2">
          Get All Reports
        </Button>
        <Button variant="info" onClick={handleDownloadPDF} className="mb-2">
          Download PDF
        </Button>
      </Form>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Church</th>
              <th>Current position</th>
              <th>Zone</th>
              <th>Office(s) Applied for</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(submission => (
              <tr key={submission.id}>
                <td>{`${submission.firstName} ${submission.lastName}`}</td>
                <td>{submission.phone}</td>
                <td>{submission.church}</td>
                <td>{submission.officeNow}</td>
                <td>{submission.zone}</td>
                <td>{submission.officeApply}</td>
                <td>{submission.gender}</td>
                <td>{submission.email}</td>
                <td>
                  <Button variant="link" onClick={() => handleShowDetails(submission)}>
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <h4>{selectedUser.firstName} {selectedUser.lastName}</h4>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Church:</strong> {selectedUser.church}</p>
              <p><strong>Current Position:</strong> {selectedUser.officeNow}</p>
              <p><strong>Zone:</strong> {selectedUser.zone}</p>
              <p><strong>Address:</strong> {selectedUser.address}</p>
              <p><strong>Gender:</strong> {selectedUser.gender}</p>
              <p><strong>Applying For:</strong> {selectedUser.officeApply}</p>
              <p><strong>Application Date:</strong> {selectedUser.timestamp.toDate().toLocaleString()}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );

  return (
    <Container fluid className="p-0">
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setActiveTab('home')}>Home</Nav.Link>
              <Nav.Link onClick={() => setActiveTab('reports')}>Reports</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <h2 className="mb-4">Received Data for TLBC Application Forms</h2>
        
        {activeTab === 'home' ? <HomeContent /> : <ReportsContent />}
      </Container>
    </Container>
  );
};

export default AdminDashboard;