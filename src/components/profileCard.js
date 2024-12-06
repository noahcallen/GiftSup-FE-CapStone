/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Button, ButtonGroup } from 'react-bootstrap';

function ProfileCard({ userData }) {
  return (
    <Container
      className="d-flex flex-column align-items-center py-4"
      style={{
        maxWidth: '400px',
        color: 'black',
      }}
    >
      <img
        src={userData.image}
        alt={userData.userName}
        style={{
          width: '300px',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '50%',
          border: '2px solid #ccc',
          marginBottom: '20px',
        }}
      />
      <h2 className="mb-3">@{userData.userName}</h2>
      <ButtonGroup className="mb-3" style={{ gap: '10px' }}>
        <Button type="button" variant="outline-primary" size="lg" className="mb-3" style={{ fontSize: '1.5rem', fontWeight: 'bold', border: '0px' }}>
          ➕
        </Button>

        <Button type="button" variant="primary" size="lg">
          Friends
        </Button>
      </ButtonGroup>
    </Container>
  );
}

ProfileCard.propTypes = {
  userData: PropTypes.shape({
    image: PropTypes.string,
    userName: PropTypes.string,
    name: PropTypes.string,
    // Include other fields as needed
  }).isRequired,
};

export default ProfileCard;
