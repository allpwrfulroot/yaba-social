import { AsyncStorage } from 'react-native'
// import config from './config'

import { ApolloClient } from 'apollo-client'
// import { createHttpLink } from 'apollo-link-http'
// import { setContext } from 'apollo-link-context'
// import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag';

import { PEOPLE } from './people'
import { PLACES } from './places'

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
      search: '',
      __typename: 'Search'
    }),
    getPeople: () => ({
      people: PEOPLE,
      __typename: 'People'
    }),
    getPlaces: () => ({
      places: PLACES,
      __typename: 'Places'
    }),
    getResults: () => ({
      peopleRes: 0,
      placesRes: 0,
      __typename: 'Results'
    })
  },
  Mutation: {
    updateSearch: (_, { search }, { cache }) => {
      let currentSearch = client.readQuery({ query: GetSearch })
      currentSearch.getSearch.search = search

      let peopleList = client.readQuery({ query: GetPeople })
      peopleList.getPeople.people = PEOPLE

      let placesList = client.readQuery({ query: GetPlaces })
      placesList.getPlaces.places = PLACES

      let results = client.readQuery({ query: GetResults })

      if(!!search) {
        let filteredPeople = peopleList.getPeople.people.filter(x =>
          x.firstName.toLowerCase().includes(search.toLowerCase())
          || x.lastName.toLowerCase().includes(search.toLowerCase())
        )
        peopleList.getPeople.people = filteredPeople
        let n = filteredPeople.length
        results.getResults.peopleRes = n > 0 && n <= 10 && n
        let filteredPlaces = placesList.getPlaces.places.filter(x =>
          x.name.toLowerCase().includes(search.toLowerCase())
          || x.location.toLowerCase().includes(search.toLowerCase())
        )
        placesList.getPlaces.places = filteredPlaces
        let m = filteredPlaces.length
        results.getResults.placesRes = m > 0 && m <= 10 && m
      } else {
        results.getResults = { peopleRes: 0, placesRes: 0, __typename: 'Results' }
      }

      cache.writeQuery({
        query: GetSearch,
        data: currentSearch
      })
      cache.writeQuery({
        query: GetPeople,
        data: peopleList
      })
      cache.writeQuery({
        query: GetPlaces,
        data: placesList
      })
      cache.writeQuery({
        query: GetResults,
        data: results
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

export const GetPeople = gql`
  query getPeople {
    getPeople @client {
      people
    }
  }
`

export const GetPlaces = gql`
  query getPlaces {
    getPlaces @client {
      places
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
