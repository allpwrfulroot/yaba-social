import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Button, Text, View } from 'react-native'

import BlogPosts from '../graphql/blog-posts.gql'
import StatusMessage from '../components/StatusMessage'

export default class HomeScreen extends Component {
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <Query query={BlogPosts}>
          {({ data, error, loading }) => {
            if (error) {
              return (
                <StatusMessage>Error: {JSON.stringify(error)}</StatusMessage>
              )
            }
            if (loading) {
              return <StatusMessage>Loading...</StatusMessage>
            }
            if (!data || !data.blogPosts) {
              return (
                <StatusMessage>
                  Hmm, something went wrong. Try again?
                </StatusMessage>
              )
            }
            return data.blogPosts.map(item => (
              <Text key={item.id}>Item: {JSON.stringify(item)}</Text>
            ))
          }}
        </Query>
      </View>
    )
  }
}
