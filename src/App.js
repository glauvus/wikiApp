import React from 'react';
import './App.css';
import Header from './Header.js';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Wikipost from './Wikipost';
import Wikilist from './Wikilist';
import Wikiedit from './Wikiedit';

function App() {

  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <Switch>
            <Route path="/wikipost">
              <Wikipost />
            </Route>
            <Route path="/wikiedit">
              <Wikiedit />
            </Route>
            <Route path="/">
              <Wikilist />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
