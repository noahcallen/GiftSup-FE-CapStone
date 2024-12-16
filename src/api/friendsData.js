import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getFriendships = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/friendships.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const friendships = data ? Object.values(data) : [];
        resolve(friendships);
      })
      .catch(reject);
  });

const addFriend = (uid, friendUid) =>
  new Promise((resolve, reject) => {
    const newFriendship = {
      uid,
      friendUid,
      status: 'pending', // or 'accepted' depending on your logic
    };
    fetch(`${endpoint}/friendships.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFriendship),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { addFriend, getFriendships };
