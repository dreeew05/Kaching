import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectStoreNameAction } from '../../redux/GlobalStateRedux/GlobalStateSelectors';
import { getDatabase } from '../DatabaseUtils/OpenDatabase';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';

export default function StoreInformationGenerator() {
  const db = getDatabase();
  const [storeName, setStoreName] = useState('Store Name');
  const actionState = useSelector(selectStoreNameAction);

  const [editNameModalVisible, setEditNameModalVisible] =
    useState(false);
  const [startDayModalVisible, setStartDayModalVisible] =
    useState(false);
  const [editCategoryModalVisible, setEditCategoryModalVisible] =
    useState(false);
  const [clickCategoryModalVisible, setClickCategoryModalVisible] =
    useState(false);

  const goToNextModal = (
    currentModalState: (isVisible: boolean) => void,
    nextModalState: ((isVisible: boolean) => void) | null,
  ) => {
    currentModalState(false);
    if (nextModalState) {
      nextModalState(true);
    }
  };

  useEffect(() => {
    const readOnly = true;
    db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(
        `SELECT storename FROM store`,
      );
      // console.log(result.rows[0]['storename']);
      setStoreName(result.rows[0]['storename']);
    }, readOnly);
  }, [actionState]);

  const date = new Date();

  const monthInWords = (month: number) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month];
  };

  return (
    <View>
      <View className="flex-row mt-5">
        <Link
          href={{
            pathname: '/(tabs)/editStoreName',
            params: {
              storeName: storeName,
            },
          }}
          asChild
        >
          <Pressable className="flex-1 pt-2">
            <View className="flex-row">
              <Text className="text-5xl ml-5 font-semibold text-green">
                {storeName}
              </Text>
            </View>
          </Pressable>
        </Link>

        <View>
          <TouchableOpacity
            className="mr-5 mt-2"
            onPress={() => setEditNameModalVisible(true)}
          >
            <View>
              <Entypo
                name="help-with-circle"
                size={35}
                color="#18573a"
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* <HomeHelpTutorial /> */}
      </View>

      <Text className="text-sm ml-5 pb-2">
        {monthInWords(date.getMonth()) +
          ' ' +
          date.getDate() +
          ',' +
          ' ' +
          date.getFullYear()}
      </Text>

      {/* For the record, I did not like how I coded this shit. 
        Fucking React Native. Fucking piece of shit framework.
        I wanted to optimize this by putting it on another component
        so that I can instantiate this piece of shit. But React 
        Native makes it complex for you by adding unnecessary 
        bullshit that was not even part of the code. Fuck!!!!!!
      */}
      {/* MODALS */}
      {/* Change Name */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={editNameModalVisible}
        onRequestClose={() => {
          setEditNameModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
          }}
          onPress={() => setEditNameModalVisible(false)}
        >
          <View className="top-[20]">
            <View className="bg-white ml-3 rounded-md w-[300]">
              <View className="mt-2">
                <Text className="text-5xl ml-2 font-semibold text-green">
                  {storeName}
                </Text>
              </View>
            </View>

            <View className="ml-3 mr-3 w-[300]">
              <View>
                <Entypo
                  name={'triangle-up'}
                  size={40}
                  color="white"
                />
              </View>
              <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 mt-[-15]">
                <Text
                  className="text-black"
                  style={{
                    fontFamily: 'Poppins-Regular',
                  }}
                >
                  Tap to edit your store name.
                </Text>
              </View>
              <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
                <Pressable
                  onPress={() =>
                    goToNextModal(
                      setEditNameModalVisible,
                      setStartDayModalVisible,
                    )
                  }
                >
                  <Text
                    className="text-black"
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                    }}
                  >
                    Continue
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Start Day */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={startDayModalVisible}
        onRequestClose={() => {
          setStartDayModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
          }}
          onPress={() => setStartDayModalVisible(false)}
        >
          <View className="top-[100]">
            <View className="bg-white ml-3 rounded-md w-[160] pl-2 py-3">
              <View className="flex-row">
                <View
                  className="bg-transparent w-36 border-2 border-green 
              rounded-xl py-2 px-4"
                >
                  <View className="flex-row items-center">
                    <FontAwesome5
                      name="plus"
                      size={20}
                      color="darkgreen"
                    />
                    <Text className="text-green text-base ml-3 font-bold mr-3">
                      Start Day
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="ml-3 mr-3">
              <View>
                <Entypo
                  name={'triangle-up'}
                  size={40}
                  color="white"
                />
              </View>
              <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 mt-[-15]">
                <Text
                  className="text-black"
                  style={{
                    fontFamily: 'Poppins-Regular',
                  }}
                >
                  Tapping the button signifies the beginning of your
                  business day. This ensures all sales and
                  transactions from this point forward will be
                  accurately recorded.
                </Text>
              </View>
              <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
                <Pressable
                  onPress={() =>
                    goToNextModal(
                      setStartDayModalVisible,
                      setEditCategoryModalVisible,
                    )
                  }
                >
                  <Text
                    className="text-black"
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                    }}
                  >
                    Continue
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modify Category */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={editCategoryModalVisible}
        onRequestClose={() => {
          setEditCategoryModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
          }}
          onPress={() => setEditCategoryModalVisible(false)}
        >
          <View className="top-[170]">
            <View className="bg-white ml-3 rounded-md w-[250] pl-[7] py-2">
              <View className="flex flex-row">
                <Text
                  className="text-3xl font-base text-darkgreen"
                  style={{
                    fontFamily: 'Poppins-Medium',
                  }}
                >
                  Categories
                </Text>
                <View className="self-center ml-3">
                  <FontAwesome5
                    name="edit"
                    size={25}
                    color="darkgreen"
                  />
                </View>
              </View>
            </View>

            <View className="ml-3 mr-3 w-[250]">
              <View className="left-[175]">
                <Entypo
                  name={'triangle-up'}
                  size={40}
                  color="white"
                />
              </View>
              <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 mt-[-15]">
                <Text
                  className="text-black"
                  style={{
                    fontFamily: 'Poppins-Regular',
                  }}
                >
                  Create, edit, or delete categories.
                </Text>
              </View>
              <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
                <Pressable
                  onPress={() =>
                    goToNextModal(
                      setEditCategoryModalVisible,
                      setClickCategoryModalVisible,
                    )
                  }
                >
                  <Text
                    className="text-black"
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                    }}
                  >
                    Continue
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Click Category */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={clickCategoryModalVisible}
        onRequestClose={() => {
          setClickCategoryModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.32)',
          }}
          onPress={() => setClickCategoryModalVisible(false)}
        >
          <View className="top-[205]">
            <View className="bg-white ml-2 rounded-md w-[200] pl-[7] py-2">
              <View className="bg-white shadow-md shadow-slate-600 m-2 p-2">
                <View className="h-40">
                  <Image
                    source={require('../../assets/images/products/10000.jpg')}
                    resizeMode="cover"
                    className="w-full h-full rounded-t-md"
                  />
                </View>
                <View className="p-2">
                  <Text
                    numberOfLines={1}
                    className="text-xl mb-1 font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                  >
                    Sample Category
                  </Text>
                </View>
              </View>
            </View>

            <View className="ml-3 mr-3 w-[250]">
              <View>
                <Entypo
                  name={'triangle-up'}
                  size={40}
                  color="white"
                />
              </View>
              <View className="bg-white rounded-tl-md rounded-tr-md px-3 py-5 mt-[-15]">
                <Text
                  className="text-black"
                  style={{
                    fontFamily: 'Poppins-Regular',
                  }}
                >
                  Display all the items available in a specific
                  category.
                </Text>
              </View>
              <View className="bg-white rounded-bl-md rounded-br-md items-center justify-center bg-green p-2">
                <Pressable
                  onPress={() =>
                    goToNextModal(setClickCategoryModalVisible, null)
                  }
                >
                  <Text
                    className="text-black"
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                    }}
                  >
                    Continue
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
