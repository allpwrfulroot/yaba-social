import React from 'react'
import { ActivityIndicator, AsyncStorage, Text } from 'react-native'
import { Jumbotron } from '../components'

export default class AuthLoadingScreen extends React.Component {
  componentDidMount = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    // Fake a loading wait
    setTimeout(
      () => this.props.navigation.navigate(userToken ? 'App' : 'Auth'),
      1000
    )
  }

  render() {
    return (
      <Jumbotron mode="primary">
        <Text style={{ color: 'white' }}>Loading...</Text>
        <ActivityIndicator />
      </Jumbotron>
    )
  }
}
