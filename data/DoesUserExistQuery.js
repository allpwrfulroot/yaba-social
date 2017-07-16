import { gql } from 'react-apollo'

const DoesUserExistQuery = gql`
  query doesUserExist($email: String!) {
    User( email: $email) {
      id
    }
  }
`

export default DoesUserExistQuery
