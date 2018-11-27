import React from 'react';


export default class Footer extends React.Component {
    render(){
        return(
            <footer>
                <div className="marketing-site-footer-bottom">
                    <div className="row large-unstack align-middle">
                        <div className="column">
                            <p>&copy; 2017 No rights reserved</p>
                        </div>
                        <div className="column">
                            <ul className="menu marketing-site-footer-bottom-links">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Works</a></li>
                                <li><a href="#">News</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}