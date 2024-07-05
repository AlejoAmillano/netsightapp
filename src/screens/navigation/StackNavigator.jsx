import { createStackNavigator } from '@react-navigation/stack'
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'
import { TabNavigator } from './TabNavigator'

const Stack = createStackNavigator()

const fadeAnimation = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  }
}

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation }}
        name="Register"
        component={Register}
      />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  )
}
