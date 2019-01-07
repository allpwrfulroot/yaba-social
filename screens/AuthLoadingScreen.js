import React from 'react'
import { ActivityIndicator, AsyncStorage, Image } from 'react-native'
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
        <Image source={require('../assets/icons/yaba_logo.png')} style={{ width: 60, height: 60 }}/>
        <ActivityIndicator color='white'/>
      </Jumbotron>
    )
  }
}
