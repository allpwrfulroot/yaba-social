import { gql } from 'react-apollo'

const LoginMutation = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(
      email: {
        email: $email
        password: $password
      }
    ) {
      token
      user {
        id
      }
    }
  }
`

export default LoginMutation
