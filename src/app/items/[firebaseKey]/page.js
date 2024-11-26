'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getWishListsByListId } from '../../../api/wishlistData';
import { getSingleItem } from '../../../api/itemData';

export default function ViewItem({ params }) {
  const [itemDetails, setItemDetails] = useState({});
  const [wishlistDetails, setWishlistDetails] = useState({});

  const { firebaseKey } = params;

  useEffect(() => {
    getSingleItem(firebaseKey).then((item) => {
      setItemDetails(item);
    });
  }, [firebaseKey]);

  useEffect(() => {
    if (itemDetails.listId) {
      getWishListsByListId(itemDetails.listId).then((wishlist) => {
        setWishlistDetails(wishlist);
      });
    }
  }, [itemDetails.listId]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={itemDetails.image} alt={itemDetails?.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {itemDetails.name} {itemDetails?.favorite ? '🤍' : ''}
        </h5>
        <p>
          <strong>Wishlist:</strong> {wishlistDetails[0]?.name}
        </p>
        <p>
          <strong>Store:</strong> {itemDetails?.storeName || 'N/A'}
        </p>
        <p>
          <strong>URL:</strong>{' '}
          <a href={itemDetails?.url} target="_blank" rel="noopener noreferrer">
            View Item
          </a>
        </p>
        <hr />
        <p>{itemDetails?.description || ''}</p>
      </div>
    </div>
  );
}

ViewItem.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
