import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Home from './Home';
import Arithmetic from './Arithmetic';
import About from './About';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element = {<Home/>} />
                    <Route path='/arithmetic' element={<Arithmetic/>} />
                    <Route path='/about' element={<About/>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
