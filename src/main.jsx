import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    // Use this if you need put the same header in all requests
    /* headers:{
      Authorization: 'Bearer ' + localStorage.getItem('user-token')
    }, */
    uri: 'http://localhost:4000',
  })
})

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
)

/* const query = gql`
  query {
    allPersons {
      id
      name
      phone
      adress {
        street
        city
      }
    }
  }
` */
//Example of a query request
/* client.query({ query }).then(result => {
  console.log(result);
}); */
