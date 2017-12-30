import React from 'react'
import {
  View,
  Text,
  FlatList
} from 'react-native'
import PlacesListItem from './components/PlacesListItem'
import { graphql, compose } from 'react-apollo'
import { GetSearch, GetFilters, UpdateResults } from '../apollo'

import { PLACES } from '../places'

class PlacesTab extends React.Component {
  state = {
    loading: true,
    error: null,
    places: []
  }

  componentWillMount() {
    this.setState({ places: PLACES, loading: false })
  }

  componentWillReceiveProps = async (nextProps) => {
    let { filters } = nextProps.filters.getFilters
    let { search } = nextProps.search.getSearch
    let newData = PLACES

    if(newData.length === 0) {
      return null
    }
    if(!!filters && filters.length > 0) {
      newData = await newData.filter(x => filters.includes(x.color) )
    }
    if(!!search && search.length > 0) {
      newData = await newData.filter(x =>
        x.name.toLowerCase().includes(search.toLowerCase())
        || x.location.toLowerCase().includes(search.toLowerCase())
      )
    }
    this.setState({ places: newData })
    this.props.results({ placesRes: newData.length })
  }

  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) => <PlacesListItem place={item} />

  _separator = () => <View style={{ height: 1, backgroundColor: 'gray' }} />

  render() {
    let { error, loading, places } = this.state
    let { getSearch } = this.props.search

    if(loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else if(places) {
      return (
        places.length > 0
        ? <FlatList
            data={places}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ItemSeparatorComponent={this._separator}
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
  graphql(GetFilters, {
    name: 'filters'
  }),
  graphql(GetSearch, {
    name: 'search'
  }),
  graphql(UpdateResults, {
    props: ({ mutate }) => ({
      results: ({ placesRes }) => mutate({
        variables: {
          placesRes
        }
      })
    })
  })
)(PlacesTab)
