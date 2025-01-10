import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: '#black',
        headerStyle: {
        backgroundColor: '#f0f3f7',
        },
        headerShadowVisible: false,
        tabBarStyle: {
        backgroundColor: '#f0f3f7',
        },
    }}
    >
        <Tabs.Screen name="budget" options={{
            title:'Budget',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'calculator-sharp' : 'calculator-outline'} color={color} size={24} />
            ),

        }} />
        <Tabs.Screen
            name="index"
            options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            ),
            }}
        />
        <Tabs.Screen name="stock" options={{
            title:'Stock',
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? 'bar-chart-sharp' : 'bar-chart-outline'} color={color} size={24} />
            ),

        }}/>
    </Tabs>
  );
}
