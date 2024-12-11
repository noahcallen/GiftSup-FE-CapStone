/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getItems } from '../api/itemData';
import { getWishLists } from '../api/wishlistData';

function Home() {
  const { user } = useAuth();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [favoriteWishlists, setFavoriteWishlists] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getItems(user.uid).then((items) => {
        const favItems = items.filter((item) => item.favorite === true);
        setFavoriteItems(favItems);
      });

      getWishLists(user.uid).then((wishlists) => {
        const favLists = wishlists.filter((list) => list.favorite === true);
        setFavoriteWishlists(favLists);
      });
    }
  }, [user]);

  // Common styles for image and text within list items
  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // space between image and text
    padding: '10px 0', // increase vertical padding for larger feel
  };

  const thumbnailStyle = {
    width: '40px',
    height: '40px',
    objectFit: 'cover',
    borderRadius: '4px',
  };

  return (
    <Container style={{ paddingTop: '150px' }}>
      <Row>
        <Col xs={12} md={6}>
          <Card style={{ background: 'rgb(230, 230, 230)', border: '3px solid gray', width: '600px', height: '500px', padding: '10px', overflowY: 'auto' }}>
            <h4 style={{ color: 'gray', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>Top Items</h4>
            {favoriteItems.length > 0 ? (
              <ListGroup variant="flush" style={{ overflowY: 'auto', height: '100%' }}>
                {favoriteItems.map((item) => (
                  <ListGroup.Item key={item.firebaseKey} style={{ background: 'transparent', ...listItemStyle, borderBottom: '1px solid #ddd' }}>
                    <img src={item.image} alt={item.name} style={thumbnailStyle} />
                    <strong style={{ fontSize: '1rem' }}>{item.name}</strong>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p style={{ textAlign: 'center' }}>No favorite items found.</p>
            )}
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card style={{ background: 'rgb(230, 230, 230)', border: '3px solid gray', width: '600px', height: '500px', padding: '10px', overflowY: 'auto' }}>
            <h4 style={{ color: 'gray', display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>Top Wishlists</h4>
            {favoriteWishlists.length > 0 ? (
              <ListGroup variant="flush" style={{ overflowY: 'auto', height: '100%' }}>
                {favoriteWishlists.map((list) => (
                  <ListGroup.Item key={list.firebaseKey} style={{ background: 'transparent', ...listItemStyle, borderBottom: '1px solid #ddd' }}>
                    <img src={list.image} alt={list.name} style={thumbnailStyle} />
                    <strong style={{ fontSize: '1rem' }}>{list.name}</strong>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p style={{ textAlign: 'center' }}>No favorite wishlists found.</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
