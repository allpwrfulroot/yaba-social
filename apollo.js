// With heavy inspiration from Scaphold.io and Graph.cool docs

import { AsyncStorage } from 'react-native'
import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws'

function makeApolloClient(graphcoollUrl, subscriptionUrl) {
  const networkInterface = createBatchingNetworkInterface({uri: graphcoolUrl})
  networkInterface.use([{
    applyBatchMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      //////////////////////////////////////////////////////////////////////
      // For rapid development, often easiest to manually log in a user on
      // the backend and hard-code the resulting token here:
      //////////////////////////////////////////////////////////////////////
      req.options.headers.Authorization = 'Bearer pasteTokenHere'
      next()

      //////////////////////////////////////////////////////////////////////
      // In reality, you store the token in AsyncStorage at login and use here:
      //////////////////////////////////////////////////////////////////////
      // AsyncStorage.getItem('Token')
      // .then(token => {
      //   if (token !== null) {
      //     req.options.headers.Authorization = `Bearer ${token}`
      //   } else {
      //     console.log('No token!')
      //   }
      //   next()
      // })
      // .catch(err => {console.log('error in mAC AsyncStorage: ', err)})
      // .done()
    }
  }])

  const wsClient = new SubscriptionClient(subscriptionUrl, {
    reconnect: true
  })

  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
  )
  const clientGraphql = new ApolloClient({
    networkInterface: networkInterfaceWithSubscriptions,
    dataIdFromObject: o => o.id,
    initialState: {},
    batchInterval: 20
  })
  return clientGraphql
}

export default makeApolloClient
