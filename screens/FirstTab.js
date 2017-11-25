import React from 'react'
import {
  Text,
  FlatList
} from 'react-native'
import ChatListItem from './components/ChatListItem'

import DATA from '../users.json'

export default class FirstTab extends React.Component {
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
        data={DATA.results}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
      />
    )
  }
}
