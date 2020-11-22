import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import './styles/App.css'
import Chat from './components/Chat.js'
import Login from './components/Login.js'
import Sidebar from './components/Sidebar.js'
import { useStateValue } from './context/StateProvider.js'

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
