import ApolloClient from 'apollo-boost'
import { FAKER_URL } from 'react-native-dotenv'

export default new ApolloClient({
  uri: FAKER_URL,
})
