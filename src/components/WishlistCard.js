/* eslint-disable @next/next/no-img-element */

'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { deleteWishlist } from '../api/wishlistData';

function WishlistCard({ listObj, onUpdate }) {
  const router = useRouter();

  const deleteThisList = () => {
    if (window.confirm(`Delete ${listObj.name}?`)) {
      deleteWishlist(listObj.firebaseKey).then(() => onUpdate());
    }
  };

  const handleView = () => {
    router.push(`/wishlists/${listObj.firebaseKey}`);
  };

  const handleEdit = () => {
    router.push(`/wishlists/edit/${listObj.firebaseKey}`);
  };

  return (
    <Card className="fixed-size-wishlist-card">
      <div className="action-dropdown">
        <Dropdown className="dropdown-select">
          <Dropdown.Toggle className="dropdown-select" variant="success" size="sm" id="dropdown-basic" />

          <Dropdown.Menu className="dropdown-select">
            <Dropdown.Item className="dropdown-select" onClick={handleView}>
              View
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-select" onClick={handleEdit}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item className="dropdown-select" onClick={deleteThisList}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="wishlist-row">
        <img src={listObj.image} alt={listObj.name} className="wishlist-thumbnail" />
        <div className="wishlist-details">
          <h5>{listObj.name}</h5>
          <p>
            <strong>Top Wishlist:</strong> {listObj.favorite ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    </Card>
  );
}

WishlistCard.propTypes = {
  listObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WishlistCard;
