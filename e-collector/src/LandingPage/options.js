import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PoubelleStyle} from '../css/my_great_place_styles.js';
import {ZoneDeTrieStyle} from '../css/my_great_place_styles.js';
import {RouteStyle} from '../css/my_great_place_styles.js';
import {PoubelleStyleHover} from '../css/my_great_place_styles.js';
import Select from 'react-select';
import {Other} from '../css/other';
import editJsonFile from 'edit-json-file';
import 'rc-pagination/assets/index.css';



const ZoneDeTrieGraph= ({ text}) => <div style={ZoneDeTrieStyle}> {text}</div>;
const RouteGraph= ({ text}) => <div style={RouteStyle}> {text}</div>;

const optionsParc = [
    { value: 'Jardin des Arènes de Cimiez', label: 'Jardin des Arènes de Cimiez' },
    { value: 'test', label: 'test' },
    { value: 'test2', label: 'test2' }
];

export default class Client extends React.Component {

    constructor(props){
        super(props);
        let data = require('../json/database.json');
        this.state = {
            menu : {
                poubelle : true
            },
            idGraph:0,
            pageMenu : {
                poubelles:1,
            },
            NbMaxElementByPage:{
                poubelles:5,
            },
            center_graph:{
                lat:43.71995511362731,
                long:7.276731660849009
            },
            colorPoubelleHover:false,
            poubelleSelectionner:null,
            RoadChanging:false,
            database:data,
            roadMapChange:null
        };
    }
    

    listPoubelle(){
        return this.state.database.elements.poubelles;
    }


    listZoneTrie(){
        return this.state.database.elements.zoneDetries;
    }

    listRoute(){
        return this.state.database.elements.routes;
    }

    _onChangeCenterMap(lat,long){
        let center_graph= {
            lat:lat,
            long:long
        };
        this.setState({
            center_graph:center_graph
        });
    }

    _onChangeMenu(string){
        let info=null;
        switch (string) {
            default:
                info =  {
                    poubelle : true,
                };
                break;
        }
        this.setState({
            menu:info
        });
    }

    _onChildClick = (key, childProps) => {
        if(childProps.text.startsWith('P')){
            this._onChangeCenterMap(childProps.lat,childProps.lng);
            this.setState({
                poubelleSelectionner: childProps.valueOf().text
            });
        }else if (childProps.text.startsWith('R') && this.state.RoadChanging){
           let tab = [];
           if(this.state.roadMapChange!=null){
               this.state.roadMapChange.map(roadName=>{
                   tab.push(roadName);
               })
           }
           tab.push(childProps.text);
           this.setState({
               roadMapChange:tab
           });
        }
    };

    _onMouseEnterPoubelle = ()=>{
        this.setState({
            colorPoubelleHover:true
        });
    };

    _onMouseLeavePoubelle= ()=>{
        this.setState({
            colorPoubelleHover:false
        });
    };

    _changePoubelle=()=>{
        this.setState({
            poubelleSelectionner:null
        });
    };

    _changePoubelle=()=>{
        this.setState({
            RoadChanging:true
        });
    };

    _anulationChange=()=>{
        this.setState({
            RoadChanging:false
        });
    };

    _saveChange=()=>{
        let file = editJsonFile('../json/database.json');
        let numPoubellesSelect = this.state.poubelleSelectionner.split("P")[1];
        console.log(numPoubellesSelect);

        file.set("elements.poubelles["+numPoubellesSelect+"].trajet",this.state.roadMapChange)
        console.log(file.get());
        //file.save();
        //TODO marche pas
        this.setState({
            RoadChanging:false,
            poubelleSelectionner:null
        });
    };


    render(){

        const PoubelleGraph = ({ text }) => <div onMouseEnter={this._onMouseEnterPoubelle}
                                                 onMouseLeave={this._onMouseLeavePoubelle} style={this.state.colorPoubelleHover?PoubelleStyleHover: PoubelleStyle}> {text}</div>;

        let color = (boolean) =>{
            if(boolean){
                return "black";
            }else{
                return ""
            }
        };

        let disable = (boolean)=>{
            if(boolean){
                return "none";
            }else{
                return "";
            }
        };

        const menu = () =>{
            return  <div className="top-bar">
                <ul className="dropdown menu" data-dropdown-menu>
                    <li className="menu-text">
                        <a onClick={()=>this._onChangeMenu("poubelle")} style={{color:color(this.state.menu.poubelle),pointerEvents:disable(this.state.menu.poubelle)}}>Poubelles</a>
                    </li>
                </ul>
            </div>;
        };

        const roadMapChanging= ()=>{
           let retour;
           if(this.state.roadMapChange!=null){
               retour = this.state.roadMapChange.map(roadName=>{
                   return <div>{roadName} -></div>
               })
           }
           return retour;
        };

        const GetInfoPoubelle = () =>{
          let retour;
          if(this.state.poubelleSelectionner!=null) {
              let poubelleName = this.state.poubelleSelectionner;
              this.listPoubelle().map(poubelle=>{
                  if(poubelleName==poubelle.nom && !this.state.RoadChanging){
                       retour=poubelle.trajet.map(route=>{
                           return <div>
                               <div>{route}</div>
                               <Other size="2rem" icon={"arrow-drop-down"} />
                           </div>;
                      });
                  }else if(this.state.RoadChanging){
                      retour = <div>
                          <div>Appuyer sur les routes pour l'ajouter au trajet de la poubelle</div>
                          <div>{roadMapChanging()}</div>
                      </div>
                  }

              })

          }
          return retour;
        };

        const ButtonDisplay = () =>{
            let retour;
            if(this.state.RoadChanging){
                retour =<div>
                    <button style={{marginRight:"3px"}} onClick={this._anulationChange} className={"button"}> Annuler</button>
                    <button onClick={this._saveChange} className={"button"}> Save</button>
                </div>;
            }else{
                retour =<div>
                    <button style={{marginRight:"3px"}} onClick={this._changePoubelle} className={"button"}> Changer de poubelles</button>
                    <button onClick={this._changePoubelle} className={"button"}> Modifier le trajet</button>
                </div>;
            }
            return retour;
        }

        const affichageInfo = () =>{
            let retour;
            if(this.state.poubelleSelectionner==null) {
                retour=<div>
                    <h3>Selectionner une poubelle </h3>
                </div>

            }else{
                retour=<div>
                    <h3>Poubelle {this.state.poubelleSelectionner}</h3>
                    <div>
                        {GetInfoPoubelle()}
                    </div>
                    {ButtonDisplay()}
                </div>
            }
            return retour;
        };

        const PoubelleDisplayGraph = ()=>{
            let retour;
            if(this.state.poubelleSelectionner==null){
                retour = this.listPoubelle().map(poubelle =>(
                    <PoubelleGraph
                        lat={poubelle.graph.lat}
                        lng={poubelle.graph.long}
                        text={poubelle.nom}
                    />
                ));
            }
            return retour;
        }

        const ZoneTrieDisplayGraph = this.listZoneTrie(this.state.database).map(trie =>(
            <ZoneDeTrieGraph
                lat={trie.graph.lat}
                lng={trie.graph.long}
                text={trie.nom}
            />
        ));

        const RouteDisplayGraph = ()=>{
          let retour;
          if(this.state.poubelleSelectionner!=null){
              retour = this.listRoute(this.state.database).map(trie =>(
                  <RouteGraph
                      lat={trie.graph.lat}
                      lng={trie.graph.long}
                      text={trie.nom}
                  />
              ));
          }
           return retour;
        };

        const centerMapDefault = {
            lat:this.state.database.lat,
            lng:this.state.database.long
        };

        const centerMap={
            lat:this.state.center_graph.lat,
            lng:this.state.center_graph.long
        };



        return (
            <div>
                <div style={{textAlign:"center"}}>
                    <h2>E-collector Zones</h2>
                    <p>Choisissez une zone :</p>
                    <div style={{width:'40%',marginLeft:'30%'}}>
                        <Select options={optionsParc} selected={optionsParc[0]} value={optionsParc[0]}/>
                    </div>
                </div>
                <h3 style={{textAlign:"center"}}>{this.state.database.nomAdr}</h3>
                <div style={{display:"flex"}}>
                    <div style={{ height: '80vh', width: '60%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDv33SIPUfRDQShB-PJA7pzjwCsnFnZ6mY"}}
                            centerMapDefault={centerMapDefault}
                            center={centerMap}
                            defaultZoom={this.state.database.zoom}
                            onChildClick={this._onChildClick}
                        >
                            {PoubelleDisplayGraph()}

                            {ZoneTrieDisplayGraph}

                            {RouteDisplayGraph()}
                        </GoogleMapReact>
                    </div>
                    <div style={{ height: '80vh', width: '40%', textAlign:"center" }}>
                        {menu()}
                        {affichageInfo()}
                    </div>
                </div>
            </div>
        );
    }
}