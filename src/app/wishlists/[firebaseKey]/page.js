/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleWishlist } from '../../../api/wishlistData';
import { getItemsByListId } from '../../../api/itemData';

export default function ViewWishlist({ params }) {
  const [listDetails, setListDetails] = useState({});
  const [items, setItems] = useState([]);

  const { firebaseKey } = params;

  useEffect(() => {
    // Fetching the wishlist details based on its firebaseKey
    getSingleWishlist(firebaseKey).then((wishlist) => {
      setListDetails(wishlist);
    });
  }, [firebaseKey]);

  useEffect(() => {
    if (listDetails.listId) {
      getItemsByListId(listDetails.listId).then((itemsArray) => {
        setItems(itemsArray);
      });
    }
  }, [listDetails.listId]);

  return (
    <div className="mt-5 d-flex flex-wrap text-white">
      <div className="d-flex flex-column">
        <img src={listDetails.image} alt={listDetails?.name} style={{ width: '300px', borderRadius: '8px' }} />
      </div>
      <div className="ms-5 details">
        <h5>
          {listDetails.name} {listDetails?.favorite ? '🤍' : ''}
        </h5>
        <hr />
        <h6>Items in this wishlist:</h6>
        {items.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.firebaseKey} style={{ marginBottom: '10px' }}>
                <div className="d-flex align-items-center">
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }} />
                  <div>
                    <strong>{item.name}</strong>
                    <br />
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#aaa' }}>
                      View Item
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found in this wishlist.</p>
        )}
      </div>
    </div>
  );
}

ViewWishlist.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
