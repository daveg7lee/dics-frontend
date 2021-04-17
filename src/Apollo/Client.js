import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

export default new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://dics-backend.herokuapp.com/graphql',
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    token: `${localStorage.getItem('token')}`,
  },
});
