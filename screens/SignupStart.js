import React from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'

export default class SignupStart extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Signup Page #1</Text>
        <TouchableOpacity
          style={{backgroundColor: 'black', padding: 6, borderRadius: 6}}
          onPress={() => this.props.navigation.navigate('SignupFinish')}>
          <Text style={{color: 'white'}}>Next page!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
