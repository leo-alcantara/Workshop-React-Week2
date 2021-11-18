
import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import About from './About';
import CrudDemo from './CrudDemo';
import Header from './Header';
import Home from './Home';
import Person from './Person';

const DemoRouter = () => {

    return (
        <div className="container">
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/person" component={Person}/>
                    <Route path="/about" component={About}/>
                    <Route path="/crud" component={CrudDemo}/>
                    <Route component={NotFound}/>

                </Switch>           
            </Router> 
            
        </div>
    );  
};

const NotFound = () => {
    return (
        <div>
            Page Not Found!
        </div>
    );
};

export default DemoRouter;