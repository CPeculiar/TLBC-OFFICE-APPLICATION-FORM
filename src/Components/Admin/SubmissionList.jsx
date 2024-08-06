import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Services/firebaseConfig';
import { Container, Table } from 'react-bootstrap';

const SubmissionsList = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const querySnapshot = await getDocs(collection(db, 'applications'));
      const submissionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData);
    };

    fetchSubmissions();
  }, []);

  return (
    <Container>
      <h2>Submissions</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Church</th>
            <th>Zone</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission.id}>
              <td>{`${submission.firstName} ${submission.lastName}`}</td>
              <td>{submission.email}</td>
              <td>{submission.phone}</td>
              <td>{submission.church}</td>
              <td>{submission.zone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SubmissionsList;