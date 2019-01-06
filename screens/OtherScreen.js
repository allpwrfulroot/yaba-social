import React, { Component } from 'react'
import { Button } from 'react-native'
import Jumbotron, { JumboTitle } from '../components/Jumbotron'

export default class HomeScreen extends Component {
  render() {
    const { navigation } = this.props
    return (
      <Jumbotron>
        <JumboTitle>Other Screen</JumboTitle>
        <Button
          title="Go to home screen"
          onPress={() => navigation.navigate('Home')}
        />
      </Jumbotron>
    )
  }
}
