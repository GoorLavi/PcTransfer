import React, {Component} from 'react';
import '../assets/css/bootstrap.min.css';
import '../assets/css/bootstrap-theme.min.css';
import '../assets/css/App.css';

import CloningMode from '../containers/modes/cloningMode';

class App extends Component {
  render() {

    return (<CloningMode/>);
  }
}

export default App;
