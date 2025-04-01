import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#232723',
        headerStyle: { backgroundColor: '#457e59' },
        tabBarStyle: { backgroundColor: '#e1ece3' },
      }}
    >
      <Tabs.Screen name="(budget)" options={{
        title: 'Budget',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'calculator-sharp' : 'calculator-outline'} color={color} size={24} />
        ),
      }} />

      <Tabs.Screen name="home" options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name="home-outline" color={color} size={24} />
        ),
      }} />

      <Tabs.Screen name="(stocks)" options={{
        title: 'Stocks',
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name="trending-up-outline" color={color} size={24} />
        ),
      }} />
    </Tabs>
  );
}
