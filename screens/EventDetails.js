import React from 'react'
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'

export default class EventDetails extends React.Component {
  render() {
    return (
      <View>
        <Text>{JSON.stringify(this.props.navigation, null, '\t')}</Text>
      </View>
    )
  }
}
