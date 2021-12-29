//import { useEffect } from 'react';
import logo from './logo.svg'
import './App.css'
import { usePerson } from './persons/custom-hooks'
import Personas from './Personas'
import PersonForm from './PersonForm'
//import { ALL_PERSONS } from './persons/graphql-queries'
import { useState } from 'react'
import Notify from './Notify'
import PhoneForm from './PhoneForm'
import LoginForm from './LoginForm'
import {useApolloClient} from '@apollo/client'

function App() {

  /* useEffect(() => {
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `
        query {
          allPersons {
            name
          }
        }
      `})
    }).
      then(res => res.json()).
      then(res => console.log(res));
  }, []) */

  const { loading, error, data } = usePerson()
  // Using polling to fetch data from server not recomended.
  /* const { loading, error, data } = useQuery(ALL_PERSONS, {
    pollInterval: 3000
  }); */

  const [errorMsg, setErrorMsg] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('user-token'))
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    window.localStorage.removeItem('user-token')
    client.clearStore()
  }

  const notifyError = (msg) => {
    setErrorMsg(msg)
    setTimeout(() => setErrorMsg(null), 3000)
  }

  if (error) return <span style="color:red">Error en la peticion</span>

  return (
    <div className="App">
      <Notify errorMessage={errorMsg} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Graphql + React!</p>
        {loading ? <p>Loading...</p> : ""}
        <Personas persons={data?.allPersons} />
        {token ? 
          <button onClick={logout}>Cerrar sesion</button>  
          :
          <LoginForm notifyError={notifyError} setToken={setToken} />
        }
        <PhoneForm />
        <PersonForm notifyError={notifyError} />
      </header>
    </div>
  )
}

export default App
