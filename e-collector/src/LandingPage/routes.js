import React from 'react';
import Header from "./header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Footer from "./footer";
import Client from "./client"
import Shop from "./shop";



export default class Routes extends React.Component {

    render(){
        let routes = ()=>{
            let retour=<div>
                    <Route exact path="/" component={Shop}/>
                    <Route path="/client" component={Client}/>
                </div>
            return retour;
        };
        return(
            <div>
                <Header/>
                <Router>
                    {routes()}
                </Router>
                <Footer />
            </div>
        )
    }
}