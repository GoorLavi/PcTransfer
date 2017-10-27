import React, { Component } from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/bootstrap-theme.min.css';

import CloningMode from '../containers/modes/cloningMode';

import '../assets/css/App.css';

class App extends Component {
  render() {


    return (
      <CloningMode />
    );
  }
}


export default App;
