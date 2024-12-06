'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';

function RegisterForm() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    uid: user.fbUser.uid,
    name: '',
    userName: '',
    image: '',
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.fbUser.uid));
    router.push('/');
  };

  return (
    <Container fluid className="d-flex vh-100 justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={6} lg={4} className="fixed-width">
          <Form onSubmit={handleSubmit} style={{ color: 'white' }}>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" required placeholder="Enter your Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAbout">
              <Form.Label style={{ color: 'white' }}>UserName</Form.Label>
              <Form.Control as="textarea" rows={3} type="text" name="userName" required placeholder="Create a UserName" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="url" name="image" required placeholder="Enter an image URL" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
            </Form.Group>
            <Button type="submit" size="lg" className="copy-btn" variant="outline-warning">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    // imageUrl: PropTypes.string.isRequired,
    fbUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RegisterForm;
