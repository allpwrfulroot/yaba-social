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
    getFilters: () => ({
      search: '',
      filters: [],
      __typename: 'Filters'
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
    updateFilters: (_, { search, filters }, { cache }) => {
      let currentFilters = client.readQuery({ query: GetFilters })
      currentFilters.getFilters = {
        search: search,
        filters: filters,
        __typename: 'Filters'
      }

      let peopleList = client.readQuery({ query: GetPeople })
      peopleList.getPeople.people = PEOPLE

      let placesList = client.readQuery({ query: GetPlaces })
      placesList.getPlaces.places = PLACES

      let results = client.readQuery({ query: GetResults })

      // BOTH SEARCH TERM AND FILTER OPTIONS PROVIDED
      if(!!search && filters.length > 0) {
        let filteredPeople = peopleList.getPeople.people.filter(x =>
          ( x.firstName.toLowerCase().includes(search.toLowerCase())
          || x.lastName.toLowerCase().includes(search.toLowerCase()) )
          && filters.includes(x.team)
        )
        peopleList.getPeople.people = filteredPeople
        results.getResults.peopleRes = filteredPeople.length
        let filteredPlaces = placesList.getPlaces.places.filter(x =>
          ( x.name.toLowerCase().includes(search.toLowerCase())
          || x.location.toLowerCase().includes(search.toLowerCase()) )
          && filters.includes(x.color)
        )
        placesList.getPlaces.places = filteredPlaces
        results.getResults.placesRes = filteredPlaces.length
      // ONLY SEARCH TERM PROVIDED
      } else if(!!search) {
        let filteredPeople = peopleList.getPeople.people.filter(x =>
          x.firstName.toLowerCase().includes(search.toLowerCase())
          || x.lastName.toLowerCase().includes(search.toLowerCase())
        )
        peopleList.getPeople.people = filteredPeople
        results.getResults.peopleRes = filteredPeople.length
        let filteredPlaces = placesList.getPlaces.places.filter(x =>
          x.name.toLowerCase().includes(search.toLowerCase())
          || x.location.toLowerCase().includes(search.toLowerCase())
        )
        placesList.getPlaces.places = filteredPlaces
        results.getResults.placesRes = filteredPlaces.length
      // ONLY FILTER OPTIONS PROVIDED
      } else if(filters.length > 0) {
        let filteredPeople = peopleList.getPeople.people.filter(x =>
          filters.includes(x.team)
        )
        peopleList.getPeople.people = filteredPeople
        results.getResults.peopleRes = filteredPeople.length
        let filteredPlaces = placesList.getPlaces.places.filter(x =>
          filters.includes(x.color)
        )
        placesList.getPlaces.places = filteredPlaces
        results.getResults.placesRes = filteredPlaces.length
      // NO SEARCH OR FILTER OPTIONS; RESETTING TO ORIGINAL DATA.
      // PEOPLE AND PLACES SHOULD NO LONGER SHOW (num) IN THE TABS
      } else {
        results.getResults = { peopleRes: 0, placesRes: 0, __typename: 'Results' }
      }

      cache.writeQuery({
        query: GetFilters,
        data: currentFilters
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
      return null
    }
  },
})

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

export const GetFilters = gql`
  query getFilters {
    getFilters @client {
      search
      filters
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
    $search: String,
    $filters: [String]
  ){
    updateFilters(
      search: $search,
      filters: $filters
    ) @client
  }
`

// const connected = localState.concat(httpLink)
// const link = authLink.concat(connected)

const client = new ApolloClient({
  // ADDING A BACKEND? UPDATE TO link: link
  link: localState,
  cache: cache
})

export default client
