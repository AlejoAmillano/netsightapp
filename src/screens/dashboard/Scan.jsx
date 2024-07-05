// Scan.js
import { useEffect, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { layoutStyles } from './layout.styles'
import { textStyles } from './text.styles'
import { statusStyles } from './status.styles'
import useAuth from '../../hooks/useAuth'
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Scan = () => {
  const { auth, setAuth } = useAuth()
  const [data, setData] = useState([])
  /*const data = [
    { id: 1, url: 'https://example.com', result: 'Success', blacklist: false },
    { id: 2, url: 'https://badurl.com', result: 'Failed', blacklist: true },
    { id: 3, url: 'https://goodurl.com', result: 'Success', blacklist: false },
  ]*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        const response = await fetch(API_URL + 'scan/user/' + auth._id, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        const jsonData = await response.json()
        setData(jsonData.scans)

        console.log(jsonData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [auth])

  return (
    <View style={layoutStyles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={[
              layoutStyles.row,
              { paddingHorizontal: 16, paddingVertical: 8 },
            ]}
          >
            <Text style={[textStyles.column, textStyles.centerText]}>
              {item.url}
            </Text>
            <Text
              style={[
                textStyles.column,
                textStyles.centerText,
                item.result === 'Safe'
                  ? statusStyles.successText
                  : statusStyles.failedText,
              ]}
            >
              {item.result}
            </Text>
            <Text style={[textStyles.column, textStyles.centerText]}>
              {item.blacklist ? 'Yes' : 'No'}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <View
            style={[
              layoutStyles.headerRow,
              { paddingHorizontal: 16, paddingVertical: 8 },
            ]}
          >
            <Text style={[textStyles.headerColumn, textStyles.centerText]}>
              URL
            </Text>
            <Text style={[textStyles.headerColumn, textStyles.centerText]}>
              Result
            </Text>
            <Text style={[textStyles.headerColumn, textStyles.centerText]}>
              Blacklist
            </Text>
          </View>
        )}
      />
    </View>
  )
}
