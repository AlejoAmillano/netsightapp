import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Scan } from '../dashboard/Scan'
import { Profile } from '../dashboard/Profile'
import { FontAwesome } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Scan"
      screenOptions={{
        tabBarStyle: {
          padding: 5,
        },
      }}
    >
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={{
          tabBarLabel: 'Scans',
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Octicons name="codescan-checkmark" size={24} color="blue" />
            ) : (
              <Octicons name="codescan-checkmark" size={24} color="gray" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <FontAwesome name="user-circle" size={24} color="blue" />
            ) : (
              <FontAwesome name="user-circle-o" size={24} color="gray" />
            ),
        }}
      />
    </Tab.Navigator>
  )
}
