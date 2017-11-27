import React from 'react'
import {
  View,
  Text,
  FlatList
} from 'react-native'
import PlacesListItem from './components/PlacesListItem'
import { graphql, compose } from 'react-apollo'
import { GetPlaces, GetFilters } from '../apollo'

class PlacesTab extends React.Component {
  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) => <PlacesListItem place={item} />

  _separator = () => <View style={{ height: 1, backgroundColor: 'gray' }} />

  render() {
    let { error, loading, getPlaces } = this.props.places
    let { getFilters } = this.props.filters

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
            ItemSeparatorComponent={this._separator}
          />
        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {
            !!getFilters.search
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
  graphql(GetFilters, {
    name: 'filters'
  })
)(PlacesTab)
