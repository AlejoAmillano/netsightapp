import { Avatar, Button, Input, Layout, Text } from '@ui-kitten/components'
import { Alert, useWindowDimensions, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useAuth from '../../hooks/useAuth'

export const Login = ({ navigation }) => {
  const [isPosting, setIsPosting] = useState(false)

  const { setAuth } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const loginUser = async () => {
    let userToLogin = form
    setIsPosting(true)
    const request = await fetch(API_URL + 'user/login', {
      method: 'POST',
      body: JSON.stringify(userToLogin),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setIsPosting(false)
    const data = await request.json()
    console.log(data)

    if (data.status === 'success') {
      await AsyncStorage.setItem('token', data.token)
      await AsyncStorage.setItem('user', JSON.stringify(data.user))
      setAuth(data.user)

      Alert.alert('Success', 'Logged correctly!')
      navigation.navigate('TabNavigator')
    } else if (data.status === 'exists') {
      Alert.alert('Error', 'User already exists!')
    } else {
      Alert.alert('Error', 'Incorrect email or password')
    }
  }

  const { height } = useWindowDimensions()

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.2, alignItems: 'center' }}>
          <Image
            source={require('../../../assets/logo.png')}
            style={{ height: 140, width: 120, marginBottom: 30 }}
          />
          <Text category="h1">Welcome back!</Text>
          <Text category="p2">Please, sign in to continue</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Space */}
        <Layout style={{ height: 10 }} />

        {/* Button */}
        <Layout>
          <Button disabled={isPosting} onPress={loginUser}>
            Sign in
          </Button>
        </Layout>

        {/* Información para crear cuenta */}
        <Layout style={{ height: 50 }} />

        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text>You dont have an account?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('Register')}
          >
            {' '}
            Sign in{' '}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}
