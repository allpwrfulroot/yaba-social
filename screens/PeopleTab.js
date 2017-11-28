import React from 'react'
import {
  View,
  Text,
  FlatList
} from 'react-native'
import PeopleListItem from './components/PeopleListItem'
import { graphql, compose } from 'react-apollo'
import { GetPeople, GetFilters } from '../apollo'

class PeopleTab extends React.Component {
  goToChat = person => {}

  goToProfile = person => {}

  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) => (
    <PeopleListItem person={item} />
  )

  render() {
    let { error, loading, getPeople } = this.props.people
    let { getFilters } = this.props.filters

    if(loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else if(getPeople) {
      return (
        getPeople.people.length > 0
        ? <FlatList
            data={getPeople.people}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {
            !!getFilters.search
            ? <Text>No matches for that search!</Text>
            : <Text>No people found! Womp womp</Text>
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
  graphql(GetPeople, {
    name: 'people'
  }),
  graphql(GetFilters, {
    name: 'filters'
  })
)(PeopleTab)
