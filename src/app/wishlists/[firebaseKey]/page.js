/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleWishlist, getWishListsByListId } from '../../../api/wishlistData';

export default function ViewItem({ params }) {
  // Initializing state for item details and wishlist details
  const [listDetails, setlistDetails] = useState({});

  // Getting the firebaseKey from the params (used to fetch specific item details)
  const { firebaseKey } = params;

  // Fetching the item details based on firebaseKey whenever it changes
  useEffect(() => {
    getSingleWishlist(firebaseKey).then((item) => {
      setlistDetails(item); // Storing the fetched item details
    });
  }, [firebaseKey]);

  // Fetching wishlist details based on the listId from the fetched item details
  useEffect(() => {
    if (listDetails.listId) {
      // Only fetch wishlist details if the item has a listId
      getWishListsByListId(listDetails.listId).then(() => {});
    }
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={listDetails.image} alt={listDetails?.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {listDetails.name} {listDetails?.favorite ? '🤍' : ''} {/* Displaying the item name and a heart if it's a favorite */}
        </h5>
      </div>
    </div>
  );
}

// PropTypes for type-checking, making sure params is an object
ViewItem.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
