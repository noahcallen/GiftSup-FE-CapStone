'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleWishlist } from '../../../../api/wishlistData';
import WishlistForm from '../../../../components/forms/WishlistForm';

export default function EditWishlist({ params }) {
  const [editList, setEditList] = useState({});
  // Grab the firebaseKey from params
  const { firebaseKey } = params;

  // Make a call to the API to get the item data
  useEffect(() => {
    getSingleWishlist(firebaseKey).then(setEditList);
  }, [firebaseKey]);

  // Pass object to the form
  return <WishlistForm obj={editList} />;
}

EditWishlist.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
