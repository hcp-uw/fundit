import { Stack, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    // <Stack screenOptions={{ headerShown: false }}>
    //   {/* Auth Stack */}
    //   <Stack.Screen name="(auth)" />

    //   {/* Main App with Tabs */}
    // </Stack>
          <Tabs
          screenOptions={{
              tabBarActiveTintColor: '#black',
              headerStyle: {
              backgroundColor: '#f0f3f7',
              },
              tabBarStyle: {
              backgroundColor: '#f0f3f7',
              },
          }}
          >
              <Tabs.Screen name="(budget)" options={{
                  title:'Budget',
                  headerShown:false,
                  tabBarIcon: ({ color, focused }) => (
                      <Ionicons name={focused ? 'calculator-sharp' : 'calculator-outline'} color={color} size={24} />
                  ),
              }} />

              <Tabs.Screen name="home" options={{
                  title:'Home',
                  headerShown:false,
                  tabBarIcon: ({ color, focused }) => (
                      <Ionicons name={focused ? 'home-outline' : 'home-outline'} color={color} size={24} />
                  ),
      
              }} />
              <Tabs.Screen name="(stocks)" options={{
                  title:'Stocks',
                  headerShown:false,
                  tabBarIcon: ({ color, focused }) => (
                      <Ionicons name={focused ? 'trending-up-outline' : 'trending-up-outline'} color={color} size={24} />
                  ),
              }} />

          </Tabs>
      
  );
}
