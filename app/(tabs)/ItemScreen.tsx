import { useLocalSearchParams } from 'expo-router';
import ParamsToInteger from '../../components/__utils__/helper/ParamsToInteger';
import { Provider, useSelector } from 'react-redux';
import { Store } from '../../redux/Store';
import { getDatabase } from '../../components/DatabaseUtils/OpenDatabase';
import { useEffect, useState } from 'react';
import { DetailedItemProps } from '../../components/__utils__/interfaces/DetailedItemProps';
import DetailedItemScreen from '../../components/Product/DetailedItemScreen';
import { selectProduct } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import ItemScreenFetchData from '../../components/Product/ItemScreenFetchData';

export default function ItemScreen() {

  const param = useLocalSearchParams();
  const id = ParamsToInteger(param.id);

  return(
    <Provider store={Store}>
      <ItemScreenFetchData
        id={id}
      />
    </Provider>
  )
}
