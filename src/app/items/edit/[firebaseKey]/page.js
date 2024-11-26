'use client';

import React, { useEffect, useState } from 'react';
import { getSingleItem } from '@/api/itemData'; // Adjust path as needed
import ItemForm from '@/components/forms/ItemForm'; // Adjust path as needed
import PropTypes from 'prop-types';

export default function EditItem({ params }) {
  const [editItem, setEditItem] = useState({});
  // Grab the firebaseKey from params
  const { firebaseKey } = params;

  // Make a call to the API to get the item data
  useEffect(() => {
    getSingleItem(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // Pass object to the form
  return <ItemForm obj={editItem} />;
}

EditItem.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
