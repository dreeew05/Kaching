import { selectAllCategories } from '../DatabaseUtils/FetchInstructions/SelectAllCategories';
import { View } from '../Themed';
import CategoryList from './CategoryList';

export default function ModifyCategoryCardGenerator() {
  const categoryData = selectAllCategories();

  return (
    <View>
      {/* Generate Categories [NOT CLICKABLE] */}
      <CategoryList cardType={'editable'} categories={categoryData} />
    </View>
  );
}
