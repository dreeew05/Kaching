// import { useDispatch, useSelector } from 'react-redux';
// import { selectProduct } from '../../../redux/GlobalStateRedux/GlobalStateSelectors';
// import { executeTransaction } from '../CoreFunctions';
// import { useEffect, useState } from 'react';
// import { BaseItemProps } from '../../__utils__/interfaces/BaseItemProps';
// import { DetailedItemProps } from '../../__utils__/interfaces/DetailedItemProps';

// const selectProductQuery = (categoryID: number) => {
//   const query = `SELECT item.id, item.name, item.price, item.image,
//                    category.name AS 'category'
//                    FROM item
//                    LEFT JOIN category ON item.category_id = category.id
//                    WHERE category.id = ${categoryID}
//                    ORDER BY item.name ASC`;

//   return executeTransaction(query, [], 'select');
// };

// const selectSpecificProductQuery = (productID: number) => {
//   const query = `SELECT *,
//                    category.name AS 'category'
//                    FROM item
//                    LEFT JOIN category ON item.category_id = category.id
//                    WHERE item.id = ${productID}`;

//   return executeTransaction(query, [], 'select');
// };

// export const selectProducts = (categoryID: number) => {
//   const actionState = useSelector(selectProduct);

//   const [productData, setProductData] = useState<BaseItemProps[]>([]);

//   useEffect(() => {
//     selectProductQuery(categoryID)
//       .then((result) => {
//         console.log(result);
//         setProductData(result as BaseItemProps[]);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [actionState]);

//   return productData;
// };

// export const selectSpecificProduct = (productID: number) => {
//   const actionState = useSelector(selectProduct);

//   const [productData, setProductData] = useState<DetailedItemProps[]>(
//     [],
//   );

//   useEffect(() => {
//     selectSpecificProductQuery(productID)
//       .then((result) => {
//         setProductData(result as DetailedItemProps[]);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [actionState]);

//   return productData;
// };
