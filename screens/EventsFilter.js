import React from 'react'
import {
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
  ListView,
  View,
  TouchableOpacity,
} from 'react-native'

export default class EventsFilter extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ padding: 8 }}>
          {JSON.stringify(this.props.navigation, null, '  ')}
        </Text>
      </View>
    )
  }
}
