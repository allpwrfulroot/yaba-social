import React, { Component } from 'react'
import { Button, Text } from 'react-native'
import Jumbotron, { JumboTitle } from '../components/Jumbotron'

export default class SignInScreen extends Component {
  static navigationOptions = {
    title: 'Hello, again!',
  }

  render() {
    return (
      <Jumbotron mode="primary">
        <Text style={{ color: 'white' }}>(Pretend to sign in)</Text>
        <Button
          title="Proceed to the app"
          color="white"
          onPress={() => this.props.navigation.navigate('App')}
        />
      </Jumbotron>
    )
  }
}
