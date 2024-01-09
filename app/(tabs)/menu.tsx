import { Provider } from 'react-redux';
import { Store } from '../../redux/Store';
import MenuComponent from '../../components/Menu/MenuComponent';

export default function MenuSettings() {
  return (
    <Provider store={Store}>
      <MenuComponent/>
    </Provider>
  )
    <View className=" py-10 marker:flex-1 self-stretch bg-white dark:bg-black">
      <View className=" flex-row justify-around w-3/4 self-center">
        <Text className="text-white font-bold  bg-green px-2 rounded-lg ">{currentDate.getDate()}</Text>
        <Text className="text-green font-bold px-2 rounded-full">{currentDateInfo.month}</Text>
        <Text className="text-green font-bold px-2 rounded-full flex items">{currentDate.getFullYear()}</Text>
      </View>

      <View className="flex items-center ">
        <Text className=" px-16 py-3 self-center bg-green text-center rounded-md  text-white text-4xl font-bold m-3">
          {"₱ "+currentEOD?.rows._array[0].total_sales}
        </Text>
        <Text className="text-green text-2xl font-bold self-center mb-10 px-2 rounded-full flex items">
          Total Sales
        </Text>
      </View>

      <Link href="/(tabs)/currentEOD" asChild>
        <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
          <Text className="text-green text-xl font-bold">View Current EOD</Text>
          <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
        </Pressable>
      </Link>

      <Link href="/(tabs)/previousEOD" asChild>
        <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
          <Text className="text-green text-xl font-bold">View Previous EOD</Text>
          <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
        </Pressable>
      </Link>

      <Link href="/(tabs)/termsOfService" asChild>
        <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
          <Text className="text-green text-xl font-bold">Terms of Service</Text>
          <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
        </Pressable>
      </Link>

      <Link href="/(tabs)/privacyPolicy" asChild>
        <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
          <Text className="text-green text-xl font-bold">Privacy Policy</Text>
          <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
        </Pressable>
      </Link>

      <Link href="/(tabs)/faqs" asChild>
        <Pressable className="bg-transparent w-5/6 self-center py-2 px-4 mt-2 mb-5 ml-2 flex-row justify-between items-center">
          <Text className="text-green text-xl font-bold">FAQs</Text>
          <FontAwesome5 name="angle-right" size={24} color="black" style={{ opacity: 0.5 }} />
        </Pressable>
      </Link>

      <Pressable
        className="bg-transparent w-4/6 self-center mt-10 bg-green items-center rounded-full py-2 px-4 mb-5 ml-2"
        onPress={showAlert}
      >
        <Text className="text-white text-xl font-bold">End Day</Text>
      </Pressable>
    </View>
  );
}
