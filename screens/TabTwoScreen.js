import React, { Component } from 'react'
import Jumbotron, { JumboTitle } from '../components/Jumbotron'

export default class TabTwoScreen extends Component {
  static navigationOptions = {
    title: 'Tab #2',
  }

  render() {
    return (
      <Jumbotron>
        <JumboTitle>First Tab</JumboTitle>
      </Jumbotron>
    )
  }
}
