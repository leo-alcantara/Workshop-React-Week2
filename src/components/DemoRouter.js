
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useLocation, Redirect } from 'react-router-dom';
import About from './About';
import Header from './Header';
import Home from './Home';
import Person from './Person';
import Welcome from './Welcome';

const DemoRouter = () => {

    return (
        <div className="container">
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/person" component={Person}/>
                    <Route path="/about" component={About}/>
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