import React from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import {
  NavigationActions
} from 'react-navigation'

export default class SignupFinish extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Signup Page #2</Text>
        <TouchableOpacity
          style={{backgroundColor: 'black', padding: 6, borderRadius: 6}}
          //////////////////////////////////////////////////////////////////////
          // Resetting here, rather than pushing App onto the existing stack,
          // because often signup has a big stack that you don't necessarily
          // want to keep dragging around in your navigation prop. Notice that
          // the reset is still weird and shows the Login screen for a second.
          //////////////////////////////////////////////////////////////////////
          // onPress={() => {
          //   let resetAction = NavigationActions.reset({
          //     index: 0,
          //     actions: [ NavigationActions.navigate({ routeName: 'App' }) ],
          //     key: null
          //   })
          //   this.props.navigation.dispatch(resetAction)
          // }} >

          //////////////////////////////////////////////////////////////////////
          // Simple push of App onto Stack, no resetting
          //////////////////////////////////////////////////////////////////////
          onPress={() => this.props.navigation.navigate('App')}>
          <Text style={{color: 'white'}}>Go to the app!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
