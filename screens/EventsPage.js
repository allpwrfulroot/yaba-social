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

export default class EventsPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={{ padding: 8 }}>Check it out! Depending on how you wrap Navigators, you can
        control transition behavior (modal or card or custom) and the header
        content!</Text>
        <Text style={{ padding: 8 }}>Also, the navigation prop only has state here. Do you know why?
          How does it change at different points in different Navigators?
          (Check out the Drawer!)</Text>
        <Text style={{ padding: 8 }}>{JSON.stringify(this.props.navigation, null, '  ')}</Text>
      </View>
    )
  }
}
