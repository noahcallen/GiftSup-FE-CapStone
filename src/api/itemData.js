import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

const getItems = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data ? Object.values(data) : []))
      .catch(reject);
  });

const createItem = (item) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const updateItem = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteItem = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items/${firebaseKey}.json`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getItemsByListId = (listId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items.json?orderBy="listId"&equalTo="${listId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data ? Object.values(data) : []))
      .catch(reject);
  });

const getSingleItem = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/items/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getItems, createItem, updateItem, deleteItem, getItemsByListId, getSingleItem };
