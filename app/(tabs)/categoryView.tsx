import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import { selectData } from '../../components/DatabaseUtils/CoreFunctions';
import CategoryViewContents from '../../components/Product/CategoryViewContents';

export default function CategoryViewScreen() {
  const param = useLocalSearchParams();

  const id : number = ParamsToInteger(param.id);

  // GET CATEGORY NAME
  const [categoryName, setCategoryName] = useState<string>('');
  const tableName    = 'category',
        column       = ['name'],
        targetAttrib = 'id',
        targetValue  = id;
  
  selectData(tableName, column,
    targetAttrib, targetValue)
      .then((result) => {
        setCategoryName(result[0].name);
      })
      .catch((error) => {
        console.log(error)
      })

  return (
    <Provider store={Store}>
      <CategoryViewContents 
        id={id}
        name={categoryName}
        type={'edit'}
      />
    </Provider>
  );
}
