import React, { useState } from 'react';
import './WhitePaperPage.scss';
import { Modal, Button, Form } from 'react-bootstrap';

const WhitePaperPage = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/save-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        console.log('Email saved');
        // Trigger PDF download here
        const link = document.createElement('a');
        link.href = '/sample.pdf'; // Provide the path to your PDF
        link.download = 'sample.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Error saving email');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Close the modal
    setShow(false);
  };

  return (
    <div className="whitepaper-page">
      <h1>Differentially-Private Offsite Prompt Tuning (DP-OPT)</h1>
      <div className="bullet-points">
        <h2>Introduction to DP-OPT</h2>
        <ul>
          <li>In the rapidly evolving landscape of artificial intelligence, Differentially-Private Offsite Prompt Tuning (DP-OPT) emerges as a groundbreaking solution.</li>
          <li>Addresses pressing concerns about data privacy in the use of Large Language Models (LLMs).</li>
          <li>Innovative approach allows users, particularly students and researchers, to harness the power of LLMs.</li>
          <li>Ensures that sensitive information remains confidential.</li>
        </ul>
      </div>
      <Button className="download-button" onClick={handleShow}>
        See Full White Paper
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Download White Paper</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            Submit and Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WhitePaperPage;
