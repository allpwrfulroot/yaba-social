import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { parse, distanceInWords } from 'date-fns'

import { Avatar, Card, StatusMessage, Title } from '../components'

export default class PostScreen extends Component {
  render() {
    const {
      params: { title, author, createdAt, body },
    } = this.props.navigation.state

    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          margin: 16,
        }}
      >
        <Card disabled={true}>
          <Title title={title} />
          <Avatar
            {...author}
            extraInfo={distanceInWords(parse(createdAt), new Date()) + ' ago'}
          />
          <Text style={{ paddingTop: 28, paddingBottom: 28 }}>{body}</Text>
        </Card>
      </ScrollView>
    )
  }
}
