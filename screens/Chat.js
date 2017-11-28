import React from 'react'
import {
  Text,
  View
} from 'react-native'

export default class Chat extends React.Component {
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props.navigation, null, '  ')}</Text>
      </View>
    )
  }
}
