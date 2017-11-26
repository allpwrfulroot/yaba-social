import React from 'react'
import {
  Text,
  FlatList
} from 'react-native'
import ChatListItem from './components/ChatListItem'
import { withApollo, graphql, compose } from 'react-apollo'
import { GetSearch, UpdateSearch } from '../apollo'

import DATA from '../users.json'

class FirstTab extends React.Component {
  state = {
    people: DATA.results
  }

  componentWillReceiveProps = async (nextProps) => {
    let filter = nextProps.data.getSearch.search.toLowerCase()
    try {
      let newData = DATA.results.filter(x => x.email.includes(filter))
      this.setState({ people: newData })
    } catch (e) {
      console.log('Error: ', e)
    }
  }

  goToChat = person => {}

  goToProfile = person => {}

  _keyExtractor = (item, index) => item.email

  _renderItem = ({ item }) => (
    <ChatListItem
      person={item}
      goToChat={this.goToChat}
      goToProfile={this.goToProfile}
    />
  )

  render() {
    return (
      <FlatList
        data={this.state.people}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    )
  }
}

export default compose(
  graphql(GetSearch)
)(FirstTab)
