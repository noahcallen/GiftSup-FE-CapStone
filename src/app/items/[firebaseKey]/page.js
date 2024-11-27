/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getWishListsByListId } from '../../../api/wishlistData';
import { getSingleItem } from '../../../api/itemData';

export default function ViewItem({ params }) {
  // Initializing state for item details and wishlist details
  const [itemDetails, setItemDetails] = useState({});
  const [wishlistDetails, setWishlistDetails] = useState({});

  // Getting the firebaseKey from the params (used to fetch specific item details)
  const { firebaseKey } = params;

  // Fetching the item details based on firebaseKey whenever it changes
  useEffect(() => {
    getSingleItem(firebaseKey).then((item) => {
      setItemDetails(item); // Storing the fetched item details
    });
  }, [firebaseKey]);

  // Fetching wishlist details based on the listId from the fetched item details
  useEffect(() => {
    if (itemDetails.listId) {
      // Only fetch wishlist details if the item has a listId
      getWishListsByListId(itemDetails.listId).then((wishlist) => {
        setWishlistDetails(wishlist); // Storing the fetched wishlist details
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
          {itemDetails.name} {itemDetails?.favorite ? '🤍' : ''} {/* Displaying the item name and a heart if it's a favorite */}
        </h5>
        <p>
          <strong>Wishlist:</strong> {wishlistDetails[0]?.name} {/* Displaying the wishlist name */}
        </p>
        <p>
          <strong>Store:</strong> {itemDetails?.storeName || 'N/A'} {/* Showing the store name or 'N/A' if not available */}
        </p>
        <p>
          <strong>URL:</strong>{' '}
          <a href={itemDetails?.url} target="_blank" rel="noopener noreferrer">
            View Item
          </a>
        </p>
        <hr />
        <p>{itemDetails?.description || ''}</p> {/* Displaying item description if available */}
      </div>
    </div>
  );
}

// PropTypes for type-checking, making sure params is an object
ViewItem.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
