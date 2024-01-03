import { useState } from "react";
import { CategoryProps } from "../../__utils__/interfaces/CategoryProps"
import { selectData } from "../CoreFunctions";

export const selectCategory = (id : number) => {

    const [categoryData, setCategoryData] = useState<CategoryProps[]>([]);

    const tableName    = 'category',
          column       = ['*'],
          targetAttrib = 'id',
          targetValue  = id;

    selectData(tableName, column, targetAttrib, targetValue)
        .then((result) => {
            console.log(result)
            // setCategoryData(result as CategoryProps[])
        })
        .catch((error) => {
            console.log(error)
        }) 

    return categoryData;
}