'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createItem, updateItem } from '../../api/itemData';
import { getWishLists } from '../../api/wishlistData';

const initialState = {
  name: '',
  url: '',
  image: '',
  listId: '',
  favorite: false,
};

function ItemForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [wishlists, setWishlists] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getWishLists(user.uid).then(setWishlists);
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
      updateItem(formInput).then(() => router.push(`/`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateItem(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Item</h2>

      {/* ITEM NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Item Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter item name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* ITEM URL INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Item URL" className="mb-3">
        <Form.Control type="url" placeholder="Enter item URL" name="url" value={formInput.url} onChange={handleChange} required />
      </FloatingLabel>

      {/* ITEM IMAGE INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Item Image URL" className="mb-3">
        <Form.Control type="url" placeholder="Enter image URL" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* WISHLIST SELECT DROPDOWN */}
      <FloatingLabel controlId="floatingSelect" label="Select Wishlist" className="mb-3">
        <Form.Select name="listId" value={formInput.listId || ''} onChange={handleChange} required>
          <option value="">Select a Wishlist</option>
          {wishlists.map((wishlist) => (
            <option key={wishlist.firebaseKey} value={wishlist.listId}>
              {wishlist.name}
            </option>
          ))}
        </Form.Select>
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
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Item</Button>
    </Form>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    listId: PropTypes.number,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.number,
  }),
};

export default ItemForm;
