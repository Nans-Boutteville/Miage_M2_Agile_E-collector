import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PoubelleStyle} from '../css/my_great_place_styles.js';
import {ZoneDeTrieStyle} from '../css/my_great_place_styles.js';
import {RouteStyle} from '../css/my_great_place_styles.js';
import {PoubelleStyleHover} from '../css/my_great_place_styles.js';
import Select from 'react-select';
import {Other} from '../css/other';
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
        };
    }


    /*
    TODO transfromation pour l'automatisation
     */
    listGraph(){ return [
        {
            nomAdr:"Jardin des Arènes de Cimiez",
            lat:43.71995511362731,
            long:7.276731660849009,
            zoom:18,
            elements:{
                poubelles : [
                    {
                        nom: "P1",
                        direction: "se dirige vers Z3",
                        battery: 100,
                        charge: 25,
                        isCharging: false,
                        graph: {
                            lat: 43.71989225310265,
                            long: 7.275623913033314,
                        },
                        trajet: [
                            {
                                nameOfRoad:"R1"
                            },
                            {
                                nameOfRoad:"R2"
                            },
                            {
                                nameOfRoad:"R3"
                            },
                            {
                                nameOfRoad:"R9"
                            },
                            {
                                nameOfRoad:"R4"
                            },
                            {
                                nameOfRoad:"R5"
                            },
                            {
                                nameOfRoad:"R8"
                            }
                        ]
                    }

                    ,{
                        nom:"P2",
                        direction:"s'occupe de Z1",
                        battery :80,
                        charge:50,
                        isCharging:false,
                        graph : {
                            lat:43.7199628471185,
                            long:7.276885068490628,
                        }
                    },{
                        nom:"P3",
                        direction:"s'occupe de Z2",
                        battery :20,
                        charge:75,
                        isCharging:false,
                        graph : {
                            lat:43.72002391515392,
                            long:7.278003658367197,
                        }
                    },{
                        nom:"P4",
                        direction:"se vide et se charge",
                        battery :50,
                        charge:100,
                        isCharging:true,
                        graph : {
                            lat:43.72076565945867,
                            long:7.277072369436269,
                        }
                    }, {
                        nom: "P5",
                        direction: "suit un parcours prédéfinis",
                        battery: 30,
                        charge: 25,
                        isCharging: false,
                        graph: {
                            lat: 43.72038439661712,
                            long: 7.277138044431808,
                        }
                    }
                ],
                zoneDetries:[
                    {
                        nom:"T1",
                        nbPoubelleDansZone:1,
                        dataPie:this.state.pie,
                        dataLine:this.state.line,
                        graph:{
                            lat:43.72076565945867,
                            long:7.277072369436269
                        }
                    }
                ],
                routes: [
                    {
                        nom:"R1",
                        graph:{
                            lat:43.72058247422525,
                            long:7.276942341671088
                        }
                    },
                    {
                        nom:"R2",
                        graph:{
                            lat:43.72039831803999,
                            long:7.27638444219599
                        }
                    },
                    {
                        nom:"R3",
                        graph:{
                            lat:43.720031942472346,
                            long:7.275762169704535
                        }
                    },
                    {
                        nom:"R4",
                        graph:{
                            lat:43.719754736188975,
                            long:7.277859657154181
                        }
                    },
                    {
                        nom:"R5",
                        graph:{
                            lat:43.72022773075285,
                            long:7.278111784801581
                        }
                    },
                    {
                        nom:"R6",
                        graph:{
                            lat:43.720282008578714,
                            long:7.27838000570307
                        }
                    },
                    {
                        nom:"R7",
                        graph:{
                            lat:43.72010560546485,
                            long:7.27839073453913
                        }
                    },
                    {
                        nom:"R8",
                        graph:{
                            lat:43.720337,
                            long:7.277547
                        }
                    },
                    ,
                    {
                        nom:"R9",
                        graph:{
                            lat:43.719745,
                            long:7.276138
                        }
                    },
                ],
            }
        }
    ];
    }
    /*
    TODO finish
     */

    listPoubelle(id){
        return this.listGraph()[id].elements.poubelles;
    }


    listZoneTrie(id){
        return this.listGraph()[id].elements.zoneDetries;
    }

    listRoute(id){
        return this.listGraph()[id].elements.routes;
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
        this._onChangeCenterMap(childProps.lat,childProps.lng);
        this.setState({
            poubelleSelectionner: childProps.valueOf().text
        })

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

        const GetInfoPoubelle = () =>{
          let retour;
          if(this.state.poubelleSelectionner!=null) {
              let poubelleName = this.state.poubelleSelectionner;
              this.listPoubelle(this.state.idGraph).map(poubelle=>{
                  if(poubelleName==poubelle.nom){

                   retour=poubelle.trajet.map(route=>{
                       return <div>
                           <div>{route.nameOfRoad}</div>
                           <Other size="2rem" icon={"arrow-drop-down"} />
                       </div>;
                  });
                  }

              })

          }
          return retour;
        };

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
                    <div>
                        <button style={{marginRight:"3px"}} onClick={this._changePoubelle} className={"button"}> Changer de poubelles</button>
                        <button onClick={this._changePoubelle} className={"button"}> Modifier le trajet</button>
                    </div>
                </div>
            }
            return retour;
        };

        const PoubelleDisplayGraph = ()=>{
            let retour;
            if(this.state.poubelleSelectionner==null){
                retour = this.listPoubelle(this.state.idGraph).map(poubelle =>(
                    <PoubelleGraph
                        lat={poubelle.graph.lat}
                        lng={poubelle.graph.long}
                        text={poubelle.nom}
                    />
                ));
            }
            return retour;
        }

        const ZoneTrieDisplayGraph = this.listZoneTrie(this.state.idGraph).map(trie =>(
            <ZoneDeTrieGraph
                lat={trie.graph.lat}
                lng={trie.graph.long}
                text={trie.nom}
            />
        ));

        const RouteDisplayGraph = ()=>{
          let retour;
          if(this.state.poubelleSelectionner!=null){
              retour = this.listRoute(this.state.idGraph).map(trie =>(
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
            lat:this.listGraph()[this.state.idGraph].lat,
            lng:this.listGraph()[this.state.idGraph].long
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
                <h3 style={{textAlign:"center"}}>{this.listGraph()[this.state.idGraph].nomAdr}</h3>
                <div style={{display:"flex"}}>
                    <div style={{ height: '80vh', width: '60%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDv33SIPUfRDQShB-PJA7pzjwCsnFnZ6mY"}}
                            centerMapDefault={centerMapDefault}
                            center={centerMap}
                            defaultZoom={this.listGraph()[this.state.idGraph].zoom}
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