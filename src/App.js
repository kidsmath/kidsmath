import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Home from './Home';
import Arithmetic from './Arithmetic';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/arithmetic" component={Arithmetic}/>
                </div>
            </Router>
        );
    }
}

export default App;
