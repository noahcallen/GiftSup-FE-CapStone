/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getWishLists } from '../../api/wishlistData';
import WishlistCard from '../../components/WishlistCard';

function ViewWishlist() {
  // State to hold items
  const [lists, setLists] = useState([]);
  const { user } = useAuth();
  // Function to fetch all items
  const fetchAllLists = () => {
    getWishLists(user.uid).then(setLists);
  };
  console.warn(lists);
  // Fetch items on component render
  useEffect(() => {
    getWishLists(user.uid).then(setLists);
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/wishlists/new" passHref>
        <Button className="add-btn">Add a Wishlist</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-center">
        {/* Map over items and display them using ItemCard */}
        {lists.map((list) => (
          <WishlistCard key={list.firebaseKey} listObj={list} onUpdate={fetchAllLists} />
        ))}
      </div>
    </div>
  );
}

export default ViewWishlist;
