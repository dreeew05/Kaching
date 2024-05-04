import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  Link,
  Tabs,
  useLocalSearchParams,
  useSegments,
} from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

interface categoryParamProps {
  category_id: number;
  id: number;
}

interface categoryViewParamProps {
  id: number;
  isEditComponent: string;
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return (
    <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Params
  const param = useLocalSearchParams();
  const categoryParams =
    param.params as unknown as categoryParamProps;
  const categoryViewParams =
    param.params as unknown as categoryViewParamProps;

  // To hide TabBar on certain pages
  const segment = useSegments();
  const page = segment[segment.length - 1];
  const pagesToHide = ['selectStoreType', 'selectDefaultCategories'];

  const headerEventHandler = () => {
    if (categoryViewParams.isEditComponent == 'true') {
      return (
        <Link
          href={{
            pathname: '/',
          }}
          asChild
        >
          <Pressable className="ml-3">
            <Ionicons name="chevron-back" size={30} color="white" />
          </Pressable>
        </Link>
      );
    } else {
      {
        return (
          <Link
            href={{
              pathname: '/(tabs)/categoryView',
              params: {
                id: categoryViewParams.id,
                isEditComponent: 'true',
              },
            }}
            asChild
          >
            <Pressable className="ml-3">
              <Ionicons name="chevron-back" size={30} color="green" />
            </Pressable>
          </Link>
        );
      }
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#18573A',
        tabBarStyle: {
          display: pagesToHide.includes(page) ? 'none' : 'flex',
          backgroundColor: 'white',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home" color={color} />
          ),
          headerStyle: {
            backgroundColor: '#18573A',
            height: 'auto',
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bars" color={color} />
          ),

          headerStyle: {
            backgroundColor: '#18573A',
            height: 'auto',
          },
        }}
      />

      <Tabs.Screen
        name="orderSummary"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/cart" asChild>
              <Pressable className="ml-3">
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="green"
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="paymentWrapper"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/(tabs)/orderSummary" asChild>
              <Pressable className="ml-3">
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="white"
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="StartDay"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="white"
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle: {
            backgroundColor: '#18573A',
          },
        }}
      />

      <Tabs.Screen
        name="receiptWrapper"
        options={{
          title: 'Receipt',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="categoryView"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar,
          headerLeft: () => headerEventHandler(),

          headerStyle: {
            backgroundColor: '#18573A',
          },
        }}
      />
      <Tabs.Screen
        name="modifyCategoryView"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar,

          headerStyle: {
            backgroundColor: '#18573A',
            height: 'auto',
          },
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable className="ml-2">
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="green"
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="modifyCategoryWrapper"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link
              href={{
                pathname: '/(tabs)/modifyCategoryView',
              }}
              asChild
            >
              <Pressable className="ml-3">
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color="green"
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="addItemWrapper"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link
              href={{
                pathname: '/(tabs)/categoryView',
                params: {
                  id: categoryParams.category_id,
                  isEditComponent: 'false',
                },
              }}
              asChild
            >
              <Pressable className="ml-3">
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color="green"
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="editItemWrapper"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link
              href={{
                pathname: '/(tabs)/categoryView',
                params: {
                  id: categoryParams.category_id,
                  isEditComponent: 'false',
                },
              }}
              asChild
            >
              <Pressable className="ml-3">
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color="green"
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="olderEODSbyDate"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ItemScreen"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link
              href={{
                pathname: '/(tabs)/categoryView',
                params: {
                  id: categoryParams.category_id,
                  isEditComponent: 'true',
                },
              }}
              asChild
            >
              <Pressable
                className="ml-3"
                onPress={() =>
                  console.log(categoryParams.category_id)
                }
              >
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color="green"
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="currentEOD"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="green"
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="previousEOD"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="green"
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="termsOfService"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/(tabs)/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="green"
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="privacyPolicy"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="green"
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="faqs"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="green"
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="pahuwayBanner"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="green"
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="editStoreName"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="code" color={color} />
          ),
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="chevron-back"
                    size={30}
                    color="green"
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerStyle: {
            backgroundColor: '#18573A',
          },
        }}
      />
    </Tabs>
  );
}
