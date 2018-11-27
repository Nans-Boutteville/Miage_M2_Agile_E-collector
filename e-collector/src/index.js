import React from 'react';
import ReactDOM from 'react-dom';
import './framework/foundation-float.min.css';
import './framework/foundation-prototype.min.css';
import './framework/foundation-rtl.min.css';
import './css/app.css';
import Routes from './LandingPage/routes'


class Index extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = "Liste des voyants"
    }

    render(){

        return (
            <div>
                <Routes></Routes>
            </div>
        );
    }
}



ReactDOM.render(
    <Index />,
    document.getElementById('root')
);


