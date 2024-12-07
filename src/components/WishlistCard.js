/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteWishlist } from '../api/wishlistData';

function WishlistCard({ listObj, onUpdate }) {
  const deleteThisList = () => {
    if (window.confirm(`Delete ${listObj.name}?`)) {
      deleteWishlist(listObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ maxWidth: '400px', border: '1px solid #ccc', padding: '5px', margin: '10px' }}>
      <Row className="g-0 align-items-center">
        <Col xs="auto">
          <img
            src={listObj.image}
            alt={listObj.name}
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'cover',
              borderRadius: '4px',
              marginRight: '10px',
            }}
          />
        </Col>
        <Col>
          <h5 className="m-0">{listObj.name}</h5>
          <p className="m-0" style={{ fontSize: '0.9rem' }}>
            <strong>Store:</strong> {listObj.storeName || 'N/A'}
            <br />
            <strong>Favorite:</strong> {listObj.favorite ? 'Yes' : 'No'}
          </p>
        </Col>
      </Row>
      <div className="d-flex justify-content-start mt-2">
        <Link href={`/items/${listObj.firebaseKey}`} passHref>
          <Button variant="primary" size="sm" className="me-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/wishlists/edit/${listObj.firebaseKey}`} passHref>
          <Button variant="info" size="sm" className="me-2">
            EDIT
          </Button>
        </Link>
        <Button variant="danger" size="sm" onClick={deleteThisList}>
          DELETE
        </Button>
      </div>
    </Card>
  );
}

WishlistCard.propTypes = {
  listObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    storeName: PropTypes.string,
    url: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WishlistCard;
