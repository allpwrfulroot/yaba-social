import React, { Component } from 'react'
import Jumbotron, { JumboTitle } from '../components/Jumbotron'

export default class TabOneScreen extends Component {
  static navigationOptions = {
    title: 'Tab #1',
  }

  render() {
    return (
      <Jumbotron>
        <JumboTitle>First Tab</JumboTitle>
      </Jumbotron>
    )
  }
}
