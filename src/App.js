import React from 'react'
import './App.css'
import Chat from './Chat.js'
import Login from './Login.js'
import Sidebar from './Sidebar.js'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { useStateValue } from './StateProvider.js'

function App() {
  const [{ user }, dispatch] = useStateValue()

  return (
    // BEM naming convention.
    <div className="App">
      { !user ? (
          <Login />
      ): (
        <div className="app__body">
          <BrowserRouter>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomID">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
