import {
  Layout,
  Text,
  Input,
  Button,
  Icon,
  Avatar,
} from '@ui-kitten/components'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {
  ScrollView,
  useWindowDimensions,
  View,
  Alert,
  Pressable,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useAuth from '../../hooks/useAuth'
import avatarUrl from '../../../assets/avatar.png'

export const Profile = ({ navigation }) => {
  /*const uploadAvatar = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
  
      if (!result.canceled) updateAvatar(result.assets)
    }
  
    const updateAvatar = async (imageUri: string) => {
      const formData = new FormData();
      const file = {
        uri: imageUri,
        name: 'avatar.jpg',
        type: 'image/jpeg',
      };
      formData.append('image', file);
      try {
        await fetch(API_URL + 'user/upload', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (error) {
        console.error(error)
      }
    }*/
  const { height } = useWindowDimensions()
  const { auth, setAuth } = useAuth()

  const [token, setToken] = useState(null)
  const [form, setForm] = useState({
    name: auth.name,
    email: auth.email,
    password: '',
  })
  const [isPosting, setIsPosting] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      setToken(token)
    })
  }, [auth])

  const updateUser = async () => {
    if (!token) return

    setIsPosting(true)

    const updatedFields = { ...auth }
    Object.keys(form).forEach((key) => {
      if (form[key] !== auth[key]) {
        updatedFields[key] = form[key]
      }
    })
    const request = await fetch(API_URL + 'user/update', {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(updatedFields),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    setIsPosting(false)
    const data = await request.json()
    console.log(data)

    if (data.status === 'success' && data.user) {
      delete data.user.password
      Alert.alert('Success', 'User updated correctly')
      setAuth(data.user)
    } else {
      Alert.alert('Error', 'Error updating user')
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token')

      setAuth({})

      setIsPosting(false)
      navigation.navigate('Login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.1, alignItems: 'center' }}>
          <Pressable
            onPress={() => {}}
            style={{
              backgroundColor: '#F7F7F7',
              padding: 20,
              borderRadius: 50,
              marginBottom: 10,
            }}
          >
            <View>
              {auth.image != 'default.png' && (
                <Avatar
                  size="giant"
                  source={{ uri: API_URL + 'user/avatar/' + auth.image }}
                  containerStyle={{
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderRadius: 100,
                    padding: 10,
                  }}
                />
              )}
              {auth.image == 'default.png' && (
                <Avatar
                  size="large"
                  source={avatarUrl}
                  containerStyle={{
                    borderColor: '#ddd',
                    borderWidth: 1,
                    borderRadius: 100,
                  }}
                />
              )}
            </View>
          </Pressable>
          <Text category="h1">{auth.name}</Text>
          <Text category="p2">Update your profile</Text>
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
          <Button
            disabled={isPosting}
            accessoryRight={
              <MaterialCommunityIcons
                name="content-save"
                size={20}
                color="white"
              />
            }
            onPress={updateUser}
          >
            Save
          </Button>
        </Layout>

        <Layout style={{ height: 100 }} />

        <Layout>
          <Button
            disabled={isPosting}
            onPress={logout}
            style={{
              backgroundColor: 'black',
              borderColor: 'black',
            }}
          >
            Log out
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  )
}
