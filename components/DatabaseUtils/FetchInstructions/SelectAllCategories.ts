import { useEffect, useState } from 'react';
import { CategoryProps } from '../../__utils__/interfaces/CategoryProps';
import { selectData } from '../CoreFunctions';
import { useSelector } from 'react-redux';
import { selectCategoryModifiedActions } from '../../../redux/GlobalStateRedux/GlobalStateSelectors';
import { getDatabase } from '../OpenDatabase';

export const selectAllCategories = () => {
  const db = getDatabase();

  const [categoryData, setCategoryData] = useState<CategoryProps[]>(
    [],
  );
  const categoryModifiedActions = useSelector(
    selectCategoryModifiedActions,
  );

  const getCategoryData = async () => {
    const readOnly = true;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(
        `SELECT * FROM category ORDER BY name`,
      );
      setCategoryData(result.rows as CategoryProps[]);
    }, readOnly);
  };

  useEffect(() => {
    getCategoryData();
  }, [categoryModifiedActions]);

  return categoryData;
};
