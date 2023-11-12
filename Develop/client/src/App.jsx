import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';
import { Outlet } from 'react-router-dom';
import { GET_ME } from './utils/queries';
import Navbar from './components/Navbar';

// Create Apollo Client instance
const client = new ApolloClient({
  uri: 'your-apollo-server-uri', // replace with your actual GraphQL server URI
  cache: new InMemoryCache(),
});

const App = () => {
 
  const { loading, error, data } = useQuery(GET_ME);

  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
};

export default App;
