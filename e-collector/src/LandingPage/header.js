import React from 'react';


export default class Header extends React.Component {

    render(){

        let header=()=>{
            const customer = <div className="hero-section-text">
                <h1>E-Collect</h1>
                <h5>L'avenir de la poubelle connecté</h5>
            </div>;
            return customer;
        };

        let listmenu=()=>{
            const customer =<ul className="dropdown menu" data-dropdown-menu>
                <li className="menu-text"><a href="/">E-Collect</a></li>
            </ul>;
            return customer;
        };


        let ConnectionButton = ()=>{
            let retour = <button type="button" className="button" onClick={()=>this._onChangeModalConnexion()}>Connexion</button>;
            return retour;
        };

        let OpenDiscussionWithMedium = ()=>{
            const menu = <header>
                <div className="hero-section">
                    {header()}
                </div>
                <div className="top-bar-container" data-sticky-container>
                    <div className="sticky sticky-topbar" data-sticky
                         data-options="anchor: page; marginTop: 0; stickyOn: small;">
                        <div className="top-bar">
                            <div className="top-bar-left">
                                {listmenu()}
                            </div>
                            <div className="top-bar-right">
                                {ConnectionButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </header>;
            let table=window.location.href.split('/');
            let retour=null;
            if(table[table.length-2]=="chatMedium"){
                retour=<header>
                </header>;
            }else{
                retour=menu;
            }
            return retour;

        };

        let modifier = ()=>{
            let retour = null;
            if(this.props.modifierAdmin){
                retour = <div className={'changeValue'}>Attention il y a eu des modifications qui n'ont pas été enregistré</div>;
            }
            return retour;
        }



        return(
            <div>
                {modifier()}


                {OpenDiscussionWithMedium()}
            </div>
        );
    }
}