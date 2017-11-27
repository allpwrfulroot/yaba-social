import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { graphql, compose } from 'react-apollo'
import { GetResults } from '../../apollo'

class CustomTabsComponent extends React.PureComponent {
  render () {
    const { navigate, state: { routes, index }} = this.props.navigation
    const { data } = this.props

    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => navigate('People')}
          style={[styles.box, 0 === index && { backgroundColor: 'black' }]}>
          <Text style={[styles.text, 0 === index && { color: 'white' }]}>
            PEOPLE {!!data.getResults && !!data.getResults.peopleRes && `(${data.getResults.peopleRes})` }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('Places')}
          style={[styles.box, 1 === index && { backgroundColor: 'black' }]}>
          <Text style={[styles.text, 1 === index && { color: 'white' }]}>
            PLACES {!!data.getResults && !!data.getResults.placesRes && `(${data.getResults.placesRes})` }
          </Text>
        </TouchableOpacity>
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

export default compose(
  graphql(GetResults)
)(CustomTabsComponent)
