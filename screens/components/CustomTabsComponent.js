import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class CustomTabsComponent extends React.PureComponent {
  render () {
    const { navigate, state: {routes, index} } = this.props.navigation

    return (
      <View style={{ flexDirection: 'row' }}>
        { routes.map( (route, i) =>
          <TouchableOpacity
            key={route.key}
            onPress={() => navigate(route.routeName)}
            style={[styles.box, i === index && {backgroundColor: 'black'}]}>
            <Text style={[styles.text, i === index && {color: 'white'}]}>
              { route.routeName.toUpperCase() }
            </Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    margin: 10,
    paddingHorizontal: 8,
    borderRadius: 11,
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'os-bold'
  },
})
