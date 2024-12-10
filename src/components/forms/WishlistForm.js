'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
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
      updateWishlist(formInput).then(() => router.push(`/wishlists`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createWishlist(payload).then(({ name }) => {
        // name is the Firebase-generated key
        const patchPayload = { firebaseKey: name, listId: name };
        updateWishlist(patchPayload).then(() => {
          router.push('/wishlists');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Wishlist</h2>

      {/* ITEM NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="List Name..." className="mb-3">
        <Form.Control type="text" placeholder="Enter Wishlist name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* ITEM IMAGE INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Thumbnail..." className="mb-3">
        <Form.Control type="url" placeholder="Enter Wishlist Thumbnail" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* FAVORITE TOGGLE */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Mark as Favorite"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Wishlist</Button>
    </Form>
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
