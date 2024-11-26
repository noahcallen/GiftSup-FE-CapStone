/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import ItemCard from '../components/ItemCard';
import { getItems } from '../api/itemData';

function Home() {
  // State to hold items
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  // Function to fetch all items
  const fetchAllItems = () => {
    getItems(user.uid).then(setItems);
  };

  // Fetch items on component render
  useEffect(() => {
    getItems(user.uid).then(setItems);
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/items/new" passHref>
        <Button>Add An Item</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-center">
        {/* Map over items and display them using ItemCard */}
        {items.map((item) => (
          <ItemCard key={item.firebaseKey} itemObj={item} onUpdate={fetchAllItems} />
        ))}
      </div>
    </div>
  );
}

export default Home;
