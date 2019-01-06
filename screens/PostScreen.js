import React, { Component } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { Query } from 'react-apollo'
import { parse, distanceInWords } from 'date-fns'

import Post from '../graphql/post.gql'
import StatusMessage from '../components/StatusMessage'
import Avatar from '../components/Avatar'
import Title from '../components/Title'
import Card from '../components/Card'

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
