import React from 'react'
import {
  View,
  Text,
  FlatList
} from 'react-native'
import PeopleListItem from './components/PeopleListItem'
import { graphql, compose } from 'react-apollo'
import { GetFilters, GetSearch, UpdateResults } from '../apollo'

import { PEOPLE } from '../people'

class PeopleTab extends React.Component {
  state = {
    loading: true,
    error: null,
    people: []
  }

  componentWillMount() {
    this.setState({ people: PEOPLE, loading: false })
  }

  componentWillReceiveProps = async (nextProps) => {
    let { filters } = nextProps.filters.getFilters
    let { search } = nextProps.search.getSearch
    let newData = PEOPLE

    if(newData.length === 0) {
      return null
    }
    if(!!filters && filters.length > 0) {
      newData = await newData.filter(x => filters.includes(x.team) )
    }
    if(!!search && search.length > 0) {
      newData = await newData.filter(x =>
        x.firstName.toLowerCase().includes(search.toLowerCase())
        || x.lastName.toLowerCase().includes(search.toLowerCase())
      )
    }
    this.setState({ people: newData })
    this.props.results({ peopleRes: newData.length })
  }

  goToChat = person => {}

  goToProfile = person => {}

  _keyExtractor = (item, index) => item.id

  _renderItem = ({ item }) => (
    <PeopleListItem person={item} />
  )

  render() {
    // let { error, loading, getPeople } = this.props.people
    let { error, loading, people } = this.state
    let { getFilters } = this.props.filters
    let { getSearch } = this.props.search

    if(loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else if(people) {
      return (
        people.length > 0
        ? <FlatList
            data={people}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {
            !!getSearch.search
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
  graphql(GetFilters, {
    name: 'filters'
  }),
  graphql(GetSearch, {
    name: 'search'
  }),
  graphql(UpdateResults, {
    props: ({ mutate }) => ({
      results: ({ peopleRes }) => mutate({
        variables: {
          peopleRes
        }
      })
    })
  })
)(PeopleTab)
