import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Button, Text, FlatList, View } from 'react-native'
import { parse, distanceInWords } from 'date-fns'

import AllPosts from '../graphql/blog-posts.gql'
import { PostListItem, StatusMessage } from '../components'

export default class HomeScreen extends Component {
  state = {
    isRefreshing: false,
  }

  navTo = item => this.props.navigation.navigate('Post', { ...item })

  keyExtractor = (item, index) => item.id

  renderItem = ({ item }) => (
    <PostListItem
      item={item}
      detail={distanceInWords(parse(item.createdAt), new Date()) + ' ago'}
      navTo={this.navTo}
    />
  )

  renderSeparator = () => <View style={{ height: 16, width: 16 }} />

  renderEmptyList = () => (
    <StatusMessage>Hmm, something went wrong. Try again?</StatusMessage>
  )

  render() {
    const { navigation, screenProps } = this.props
    const { isRefreshing } = this.state

    return (
      <Query query={AllPosts} variables={{ count: 10 }}>
        {({ data, error, loading, refetch }) => {
          if (error) {
            return <StatusMessage>Error: {JSON.stringify(error)}</StatusMessage>
          }
          if (loading && !isRefreshing) {
            return <StatusMessage>Loading...</StatusMessage>
          }
          return (
            <FlatList
              style={{ backgroundColor: screenProps.theme.white }}
              data={data.allPosts}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
              ListEmptyComponent={this.renderEmptyList}
              contentContainerStyle={{
                padding: 16,
              }}
              refreshing={isRefreshing}
              onRefresh={() => {
                this.setState({ isRefreshing: true })
                refetch()
                  .then(res => this.setState({ isRefreshing: false }))
                  .catch(err => this.setState({ isRefreshing: false }))
              }}
            />
          )
        }}
      </Query>
    )
  }
}
