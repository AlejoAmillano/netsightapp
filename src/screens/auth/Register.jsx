import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { Alert, useWindowDimensions, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { API_URL } from '@env'

export const Register = ({ navigation }) => {
  const { height } = useWindowDimensions()
  const [isPosting, setIsPosting] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerUser = async () => {
    let newUser = form
    setIsPosting(true)
    const request = await fetch(API_URL + 'user/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    setIsPosting(false)
    const data = await request.json()
    console.log(data)

    if (data.status === 'success') {
      Alert.alert('Success', 'Registered correctly!')
      navigation.navigate('Login')
    } else if (data.status === 'exists') {
      Alert.alert('Error', 'User already exists!')
    } else {
      Alert.alert('Error', 'Something went wrong!')
    }
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.2, alignItems: 'center' }}>
          <Image
            source={require('../../../assets/logo.png')}
            style={{ height: 140, width: 120, marginBottom: 30 }}
          />
          <Text category="h1">Create account</Text>
          <Text category="p2">Please, sign up to continue</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Name"
            value={form.name}
            onChangeText={(name) => setForm({ ...form, name })}
            style={{ marginBottom: 10 }}
          />
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
          <Button disabled={isPosting} onPress={registerUser}>
            Crear
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
          <Text>You already have an account?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}
          >
            {' '}
            Sign up{' '}
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}
