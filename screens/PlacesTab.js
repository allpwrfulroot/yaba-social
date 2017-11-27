import React from 'react'
import {
  View,
  Text,
  FlatList
} from 'react-native'
// import PeopleListItem from './components/PeopleListItem'
import { graphql, compose } from 'react-apollo'
import { GetPlaces, GetSearch } from '../apollo'

class PlacesTab extends React.Component {
  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) => (
    <Text>{item.name}</Text>
  )

  render() {
    let { error, loading, getPlaces } = this.props.places
    let { getSearch } = this.props.searchTerm

    if(loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else if(getPlaces) {
      return (
        getPlaces.places.length > 0
        ? <FlatList
            data={getPlaces.places}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {
            !!getSearch.search
            ? <Text>No matches for that search!</Text>
            : <Text>No places found! Womp womp</Text>
          }
        </View>
      )
    } else {
      return (
        <View>
          <Text>Error!</Text>
          <Text>{JSON.stringify(error)}</Text>
        </View>
      )
    }
  }
}

export default compose(
  graphql(GetPlaces, {
    name: 'places'
  }),
  graphql(GetSearch, {
    name: 'searchTerm'
  })
)(PlacesTab)
