// THIS SETUP WILL ONLY HANDLE LOCAL STATE.
// TO HOOK UP A GRAPHQL BACKEND, UNCOMMENT THE THINGS AND ADD CONFIG FILE!!

import { AsyncStorage } from 'react-native'
// import config from './config'

import { ApolloClient } from 'apollo-client'
// import { createHttpLink } from 'apollo-link-http'
// import { setContext } from 'apollo-link-context'
// import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

// const httpLink = createHttpLink({ uri: config.graphqlUrl })

// const authLink = setContext(async (req, { headers }) => {
//   const token = await AsyncStorage.getItem('Token')
//   return {
//     ...headers,
//     headers: {
//       Authorization: token ? `Bearer ${token}` : null,
//     },
//   }
// })

export const GetFilters = gql`
  query getFilters {
    getFilters @client {
      filters
    }
  }
`

export const GetSearch = gql`
  query getSearch {
    getSearch @client {
      search
    }
  }
`

export const GetResults = gql`
  query getResults {
    getResults @client {
      peopleRes
      placesRes
    }
  }
`

export const UpdateFilters = gql`
  mutation updateFilters(
    $filters: [String]
  ){
    updateFilters(
      filters: $filters
    ) @client
  }
`

export const UpdateSearch = gql`
  mutation updateSearch(
    $search: String
  ){
    updateSearch(
      search: $search
    ) @client
  }
`

export const UpdateResults = gql`
  mutation updateResults(
    $peopleRes: Int,
    $placesRes: Int
  ){
    updateResults(
      peopleRes: $peopleRes,
      placesRes: $placesRes
    ) @client
  }
`

const localState = withClientState({
  Query: {
    getFilters: () => ({
      filters: [],
      __typename: 'Filters'
    }),
    getSearch: () => ({
      search: '',
      __typename: 'Search'
    }),
    getResults: () => ({
      peopleRes: 0,
      placesRes: 0,
      __typename: 'Results'
    })
  },
  Mutation: {
    updateFilters: (_, { filters }, { cache }) => {
      let currentFilters = client.readQuery({ query: GetFilters })
      currentFilters.getFilters.filters = filters

      cache.writeQuery({
        query: GetFilters,
        data: currentFilters
      })
      return null
    },
    updateSearch: (_, { search }, { cache }) => {
      let currentSearch = client.readQuery({ query: GetSearch })
      currentSearch.getSearch.search = search

      cache.writeQuery({
        query: GetSearch,
        data: currentSearch
      })
      return null
    },
    updateResults: (_, { peopleRes, placesRes }, { cache }) => {
      console.log('peopleRes: ', peopleRes)
      console.log('placesRes: ', placesRes)
      let currentResults = client.readQuery({ query: GetResults })
      if(!!peopleRes) {
        currentResults.getResults.peopleRes = peopleRes
      }
      if(!!placesRes) {
        currentResults.getResults.placesRes = placesRes
      }
      cache.writeQuery({
        query: GetResults,
        data: currentResults
      })
      return null
    }
  }
})

// const connected = localState.concat(httpLink)
// const link = authLink.concat(connected)

const client = new ApolloClient({
  // ADDING A BACKEND? UPDATE TO link: link
  link: localState,
  cache: cache
})

export default client
