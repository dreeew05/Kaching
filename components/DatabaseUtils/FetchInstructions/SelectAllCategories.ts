import { useEffect, useState } from 'react';
import { CategoryProps } from '../../__utils__/interfaces/CategoryProps';
import { selectData } from '../CoreFunctions';
import { useSelector } from 'react-redux';
import { selectCategoryModifiedActions } from '../../../redux/GlobalStateRedux/GlobalStateSelectors';

export const selectAllCategories = () => {
  const tableName = 'category',
    column = ['*'],
    targetAttrib = null,
    targetValue = null,
    orderBy = 'name';

  const [categoryData, setCategoryData] = useState<CategoryProps[]>(
    [],
  );
  const categoryModifiedActions = useSelector(
    selectCategoryModifiedActions,
  );

  useEffect(() => {
    selectData(tableName, column, targetAttrib, targetValue, orderBy)
      .then((result) => {
        setCategoryData(result as CategoryProps[]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryModifiedActions]);

  return categoryData;
};
