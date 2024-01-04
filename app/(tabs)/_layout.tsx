import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => (
            <FontAwesome5 name="store" size={24} color="green" style={{ marginLeft: 20 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orderSummary"
        options={{
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="green"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/cart" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="green"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="receipt"
        options={{
          title: 'Receipt',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="modifyItems"
        options={{
          title: 'Modify Items',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="categoryView"
        options={{
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="//" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="green"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="modifyCategoryView"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="modifyCategory"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
        }}
      />
      <Tabs.Screen
        name="AddItemScreen"
        options={{
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="green"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="ItemScreen"
        options={{
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="green"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="currentEOD"
        options={{
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="darkgreen"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
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
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="darkgreen"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
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
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="darkgreen"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
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
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="darkgreen"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
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
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="darkgreen"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="startDayInput"
        options={{
          title: 'Start Day',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="//" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="darkgreen"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
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
          title: 'Back',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          href: null, // Hide this tab from the tab bar
          headerLeft: () => (
            <Link href="/menu" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="arrow-left"
                    size={24}
                    color="green"
                    style={{ marginLeft: 10, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
