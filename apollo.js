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
    getFilters: () => ({
      search: '',
      categories: [],
      tags: [],
      __typename: 'SearchFilter'
    }),
  },
  Mutation: {
    updateFilters: (_, { search, categories, tags }, { cache }) => {
      const data = {
        search: search,
        categories: categories,
        tags: tags,
        __typename: 'SearchFilter'
      }
      cache.writeQuery({ query, variables, data })
      return null
    }
  },
})

export const GetFilters = gql`
  query getFilters {
    getFilters @client {
      search
      categories
      tags
    }
  }
`

export const UpdateFilters = gql`
  mutation updateFilters(
    $search: String,
    $categories: [String!],
    $tags: [String!]
  ){
    updateFilters(
      search: $message,
      categories: $title,
      tags: $tags
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
