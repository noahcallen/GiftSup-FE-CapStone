'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, Container } from 'react-bootstrap';
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
          router.push('/items');
        });
      });
    }
  };

  return (
    <Container fluid className="centered-form-container">
      <Form onSubmit={handleSubmit} className="centered-form">
        <h2 className="text-black mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Item</h2>

        {/* ITEM NAME INPUT */}
        <FloatingLabel controlId="floatingInput1" label="Item Name" className="mb-3">
          <Form.Control style={{ borderRadius: '10px', border: '2px solid black' }} type="text" placeholder="Enter item name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>

        {/* ITEM URL INPUT */}
        <FloatingLabel controlId="floatingInput2" label="Item URL" className="mb-3">
          <Form.Control style={{ borderRadius: '10px', border: '2px solid black' }} type="url" placeholder="Enter item URL" name="url" value={formInput.url} onChange={handleChange} required />
        </FloatingLabel>

        {/* ITEM IMAGE INPUT */}
        <FloatingLabel controlId="floatingInput3" label="Item Image URL" className="mb-3">
          <Form.Control style={{ borderRadius: '10px', border: '2px solid black' }} type="url" placeholder="Enter image URL" name="image" value={formInput.image} onChange={handleChange} required />
        </FloatingLabel>

        {/* WISHLIST SELECT DROPDOWN */}
        <FloatingLabel controlId="floatingSelect" label="Select Wishlist" className="mb-3">
          <Form.Select style={{ borderRadius: '10px', border: '2px solid black' }} name="listId" value={formInput.listId} onChange={handleChange} required>
            <option value="">Select a Wishlist</option>
            {wishlists.map((wishlist) => (
              <option key={wishlist.firebaseKey} value={wishlist.listId}>
                {wishlist.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        {/* FAVORITE TOGGLE */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <Form.Check
            className="text-black mb-3"
            type="checkbox"
            id="favorite"
            name="favorite"
            label="Top Item?"
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
        <Button className="add-btn" type="submit">
          {obj.firebaseKey ? 'Update' : 'Create'} Item
        </Button>
      </Form>
    </Container>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    listId: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.number,
  }),
};

export default ItemForm;
