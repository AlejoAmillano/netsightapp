import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})

  useEffect(() => {
    authUser()
  }, [auth])

  const authUser = async () => {
    const token = await AsyncStorage.getItem('token')
    const user = await AsyncStorage.getItem('user')
    if (!token || !user) {
      return false
    }

    const userObj = JSON.parse(user)
    const userId = userObj.id

    const request = await fetch(API_URL + 'user/profile/' + userId, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
    const data = await request.json()
    setAuth(data.user)
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
