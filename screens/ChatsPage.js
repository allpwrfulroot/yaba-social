import React from 'react'
import {
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
  SwipeableListView,
  View,
  TouchableOpacity,
} from 'react-native'

export default class ChatsPage extends React.Component {

  render() {
    return (
      <Text>placeholder</Text>
    )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontFamily: 'os-bold',
    fontSize: 16,
    padding: 12
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: 'lightgray',
  }
})
