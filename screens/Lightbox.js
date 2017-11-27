import React from 'react'
import {
  Text,
  View
} from 'react-native'

export default class Lightbox extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: 'transparent', margin: 25, shadowOpacity: 0 }}>
        <Text>{JSON.stringify(this.props.navigation, null, '\t')}</Text>
      </View>
    )
  }
}
