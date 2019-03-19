import React, { Component } from 'react';
import PlotGenerator from './PlotGenerator.js';
import './main.scss';

class App extends Component {
  render() {
    return (
      <div className="App hero">
          <h1 className="title is-1">Star Wars Plot Generator</h1>
          <PlotGenerator></PlotGenerator>
      </div>
    );
  }
}

export default App;
