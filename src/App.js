import React from 'react';
import './App.css';
import GameManagerContainer from './Containers/GameManagerContainer'
import MainScreenContainer from './Containers/MainScreenContainer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <Router>  
        <Switch>
          <Route exact path="/"> 
            <MainScreenContainer />
          </Route>
          <Route path="/game">
            <Header /> 
            <GameManagerContainer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
