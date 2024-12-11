'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { deleteItem } from '../api/itemData';

function ItemCard({ itemObj, onUpdate }) {
  const deleteThisItem = () => {
    if (window.confirm(`Delete ${itemObj.name}?`)) {
      deleteItem(itemObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="fixed-size-card">
      <Card.Img variant="top" src={itemObj.image} alt={itemObj.name} className="card-img-top" />
      <Card.Body className="fixed-size-card-body">
        <Card.Title className="truncate-text">{itemObj.name}</Card.Title>

        <p className="card-text truncate-text">
          <strong>URL:</strong>{' '}
          <a href={itemObj.url} target="_blank" rel="noopener noreferrer">
            View Item
          </a>
        </p>
        <p className="card-text truncate-text">
          <strong>Top Item:</strong> {itemObj.favorite ? 'Yes' : 'No'}
        </p>

        {/* Dropdown for Actions */}
        <Dropdown>
          <Dropdown.Toggle className="dropdown-select" variant="success" id="dropdown-basic" />
          <Dropdown.Menu>
            <Dropdown.Item className="dropdown-select" href={`/items/${itemObj.firebaseKey}`}>
              View
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-select" href={`/items/edit/${itemObj.firebaseKey}`}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-select" onClick={deleteThisItem}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
