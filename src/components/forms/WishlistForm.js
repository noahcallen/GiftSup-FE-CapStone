'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, Container } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createWishlist, updateWishlist } from '../../api/wishlistData';

const initialState = {
  name: '',
  image: '',
  listId: '',
  favorite: false,
};

function WishlistForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateWishlist(formInput).then(() => router.push('/wishlists'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createWishlist(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name, listId: name };
        updateWishlist(patchPayload).then(() => {
          router.push('/wishlists');
        });
      });
    }
  };

  return (
    <Container fluid className="centered-form-container">
      <Form onSubmit={handleSubmit} className="centered-form">
        <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Wishlist</h2>

        <FloatingLabel controlId="floatingInput1" placeholder="Enter Wishlist name" label="List Name..." className="mb-3">
          <Form.Control type="text" style={{ borderRadius: '10px', border: '2px solid black' }} placeholder="Enter Wishlist name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Thumbnail..." className="mb-3">
          <Form.Control style={{ borderRadius: '10px', border: '2px solid black' }} type="url" placeholder="Enter Wishlist Thumbnail" name="image" value={formInput.image} onChange={handleChange} required />
        </FloatingLabel>

        {/* FAVORITE CHECKBOX */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <Form.Check
            className="text-black mb-3"
            type="checkbox"
            id="favorite"
            name="favorite"
            label="Top Wishlist?"
            checked={formInput.favorite}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                favorite: e.target.checked,
              }));
            }}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <Button className="add-btn" type="submit" variant="outline-warning">
          {obj.firebaseKey ? 'Update' : 'Create'} Wishlist
        </Button>
      </Form>
    </Container>
  );
}

WishlistForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    listId: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

export default WishlistForm;
