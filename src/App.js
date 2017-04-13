import React, { Component } from 'react';
import {
  HashRouter,
  Route
} from 'react-router-dom';

import Home from './Home';
import Arithmetic from './Arithmetic';
import About from './About';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route exact path='/' component={Home}/>
                    <Route path='/arithmetic' component={Arithmetic} />
                    <Route path='/about' component={About} />
                </div>
            </HashRouter>
        );
    }
}

export default App;
