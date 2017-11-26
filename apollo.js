import { AsyncStorage } from 'react-native'
// import config from './config'

import { ApolloClient } from 'apollo-client'
// import { createHttpLink } from 'apollo-link-http'
// import { setContext } from 'apollo-link-context'
// import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag';

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

// const httpLink = createHttpLink({ uri: config.graphqlUrl })

// const authLink = setContext(async (req, { headers }) => {
//   const token = await AsyncStorage.getItem('Token')
//   console.log('sanity token: ', token)
//   return {
//     ...headers,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : null,
//     },
//   }
// })

const localState = withClientState({
  Query: {
    getSearch: () => ({
      search: 'Foo',
      __typename: 'Search'
    }),
  },
  Mutation: {
    updateSearch: (_, { search }, { cache }) => {
      let current = client.readQuery({ query: GetSearch })
      current.getSearch.search = search
      // console.log(current)
      cache.writeQuery({
        query: GetSearch,
        data: current
      })
      return search
    }
  },
})

export const GetSearch = gql`
  query getSearch {
    getSearch @client {
      search
    }
  }
`

export const UpdateSearch = gql`
  mutation updateSearch(
    $search: String,
  ){
    updateSearch(
      search: $search,
    ) @client
  }
`


// const temp = localState.concat(httpLink)
// const link = authLink.concat(temp)

const client = new ApolloClient({
  link: localState,
  cache: cache
})

export default client
