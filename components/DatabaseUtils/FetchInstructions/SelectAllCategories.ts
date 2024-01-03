import { useEffect, useState } from "react";
import { CategoryProps } from "../../__utils__/interfaces/CategoryProps";
import { selectData } from "../CoreFunctions";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { selectCategory } from "../../../redux/GlobalStateRedux/GlobalStateSelectors";
// import { useCategoryContext } from "../../context/CategoryContext";

export const selectAllCategories = () => {
    
    // const {actions, addAction} = useCategoryContext();

    const actionState = useSelector(selectCategory);

    const tableName  = 'category',
        column       = ['*'],
        targetAttrib = null,
        targetVal    = null;

    const [categoryData, setCategoryData] = useState<CategoryProps[]>([]);

    useEffect(() => {
        selectData(tableName, column, targetAttrib, targetVal)
        .then((result) => {
            setCategoryData(result as CategoryProps[])
        })
        .catch((error) => {
            console.log(error);
        })
    }, [actionState]); 

    return categoryData
}