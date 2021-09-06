import { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import axios from 'axios'

import './App.css'
import GlobalStyle from './styles/style'
import Root from './pages/Root'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Talent from './pages/Talent'
import Results from './pages/Results'

function Lost() {
  return <>404 not found</>
}

function App() {
  const [jwtToken, setJwtToken] = useState('')

  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt-token')
    if (storedJwt) setJwtToken(storedJwt)
  }, [])

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact component={Root} />
        {/* <Route path="/login" exact component={Login} /> */}
        <Route path="/login" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/talent/:id" component={Talent} />
        <Route path="/results/:id" component={Results} />
        <Route component={Lost} />
        {/* <Route path="/dashboard" render={(props) => {
          <Dashboard {...props} setAuthToken={setAuthToken}/>
        }} /> */}

        {/* <Route path="/talent/:id" component={Posting} /> */}
        {/* <Route path="/results/:id" component={Result} /> */}
      </Switch>
    </Router>
  );
}

export default App;
