// import { getSingleItem } from './itemData';
// import { getSingleWishlist } from './wishlistData';

// const viewItemDetails = (itemFirebaseKey) =>
//   new Promise((resolve, reject) => {
//     getSingleItem(itemFirebaseKey)
//       .then((itemObject) => {
//           getSingleWishlist(itemObject.listId)
//             .then((wishlistObject) => {
//               resolve({ wishlistObject, ...itemObject }); // Combine item and wishlist details
//             })
//   })
//       .catch((error) => reject(error));
//   });

// export default viewItemDetails;
