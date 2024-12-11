import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

const getWishLists = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/wishlists.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data ? Object.values(data) : []))
      .catch(reject);
  });

const getWishlistsByUserId = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/wishlists.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data ? Object.values(data) : []))
      .catch(reject);
  });

const createWishlist = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/wishlists.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const updateWishlist = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/wishlists/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(resolve)
      .catch(reject);
  });

const deleteWishlist = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/wishlists/${firebaseKey}.json`, {
      method: 'DELETE',
    })
      .then(resolve)
      .catch(reject);
  });

const getSingleWishlist = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/wishlists/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getWishlistNamesByUserId = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`https://gitsup-c2de3-default-rtdb.firebaseio.com/wishlists.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // Map over the data to extract wishlist names
          const wishlistNames = Object.values(data).map((wishlist) => wishlist.name);
          resolve(wishlistNames);
        } else {
          resolve([]); // Return an empty array if no data found
        }
      })
      .catch(reject);
  });

const getWishListsByListId = (listId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/wishlists.json?orderBy="listId"&equalTo="${listId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data ? Object.values(data) : []))
      .catch(reject);
  });

export { getWishLists, getWishlistsByUserId, createWishlist, updateWishlist, deleteWishlist, getSingleWishlist, getWishlistNamesByUserId, getWishListsByListId };
