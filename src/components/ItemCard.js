'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteItem } from '../api/itemData';

function ItemCard({ itemObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE ITEM AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE ITEMS
  const deleteThisItem = () => {
    if (window.confirm(`Delete ${itemObj.name}?`)) {
      deleteItem(itemObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={itemObj.image} alt={itemObj.name} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{itemObj.name}</Card.Title>
        <p className="card-text">
          <strong>Store:</strong> {itemObj.storeName || 'N/A'}
        </p>
        <p className="card-text">
          <strong>URL:</strong>{' '}
          <a href={itemObj.url} target="_blank" rel="noopener noreferrer">
            View Item
          </a>
        </p>
        <p className="card-text">
          <strong>Favorite:</strong> {itemObj.favorite ? 'Yes' : 'No'}
        </p>
        {/* DYNAMIC LINK TO VIEW THE ITEM DETAILS */}
        <Link href={`/items/${itemObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE ITEM DETAILS */}
        <Link href={`/items/edit/${itemObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisItem} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    storeName: PropTypes.string,
    url: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ItemCard;
