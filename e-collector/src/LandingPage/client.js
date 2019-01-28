import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PoubelleStyle} from '../css/my_great_place_styles.js';
import {ZoneInfluStyle} from '../css/my_great_place_styles.js';
import {ZoneDeTrieStyle} from '../css/my_great_place_styles.js';
import {Battery} from '../css/battery';
import {Charges} from '../css/charges';
import {Doughnut} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import Select from 'react-select';
import {Bar} from 'react-chartjs-2';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';



const PoubelleGraph = ({ text }) => <div style={PoubelleStyle}> {text}</div>;
const ZoneInfluenceGraph= ({ text, diametre}) => <div style={ZoneInfluStyle(diametre)}> {text}</div>;
const ZoneDeTrieGraph= ({ text}) => <div style={ZoneDeTrieStyle}> {text}</div>;

let charging = (isCharging,battery)=>{
    if(isCharging){
        return <Battery size="2rem" icon={"charging-"+battery} />
    }else{
       return <Battery size="2rem" icon={""+battery} />
    }
};


const options = [
    { value: 'month', label: 'Par mois' },
    { value: 'year', label: 'Par année' },
    { value: 'week', label: 'Par semaine' }
];

const optionsParc = [
    { value: 'Jardin des Arènes de Cimiez', label: 'Jardin des Arènes de Cimiez' },
];

//usage:


export default class Client extends React.Component {
    constructor(props){
        super(props);
        let data = require('../json/database.json');
        this.state = {
            menu : {
                poubelle : true,
                trie:false,
                afluance:false
            },
            idGraph:0,
            pageMenu : {
                poubelles:1,
                trie:1,
                afluance:1
            },
            NbMaxElementByPage:{
                poubelles:5,
                trie:1,
                afluance:2
            },
            center_graph:{
                lat:43.71995511362731,
                long:7.276731660849009
            },
            database :data
        };
        console.log(data);
    }


    listPoubelle(){
            return this.state.database.elements.poubelles;
        }


    listZoneTrie(){
        return this.state.database.elements.zoneDetries;
    }


    listZoneAfluance(){
        return this.state.database.elements.zoneDAfluence;
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
            case "trie":
                info =  {
                poubelle : false,
                    trie:true,
                    afluance:false
                };
                break;
            case "afluance":
                info =  {
                    poubelle : false,
                    trie:false,
                    afluance:true
                };
                break;
            default:
                info =  {
                    poubelle : true,
                    trie:false,
                    afluance:false
                };
                break;
        }
        this.setState({
           menu:info
        });
    }

    _onChangePagePoubelle= (page)=>{
        const triePage = this.state.pageMenu.trie;
        const afluencePage = this.state.pageMenu.afluance;
        let pageMenu= {
            poubelles:page,
            trie:triePage,
            afluance:afluencePage
        };
        this.setState({
            pageMenu: pageMenu,
        });
    };

    _onChangePageTrie= (page)=>{
        const poubellePage = this.state.pageMenu.poubelles;
        const afluencePage = this.state.pageMenu.afluance;
        let pageMenu= {
            poubelles:poubellePage,
            trie:page,
            afluance:afluencePage
        };
        this.setState({
            pageMenu: pageMenu,
        });
    };

    _onChangePageAfluence = (page)=>{
        const poubellePage = this.state.pageMenu.poubelles;
        const triePage = this.state.pageMenu.trie;
        let pageMenu= {
            poubelles:poubellePage,
            trie:triePage,
            afluance:page
        };
        this.setState({
            pageMenu: pageMenu,
        });
    };

    render(){
        const Poubelle = ({nom,directionPhrase,battery,charge,lat,long, isCharging=false})=><div>
            <p><a onClick={()=>this._onChangeCenterMap(lat,long)}><strong>{nom}</strong></a> {directionPhrase}</p>
            <p>{charging(isCharging,battery)}{battery}%
                <Charges size="2rem" icon={""+charge} />{charge}% de charges</p>
            <p> </p>
        </div>;

        const ZoneDeTrie = ({nom,nbPoubellesDansZoneDeTrie,dataPie,dataLine,lat,long})=><div>
            <p><a onClick={()=>this._onChangeCenterMap(lat,long)}><strong>{nom}</strong></a> Statistiques : </p>
            <p>Nombre de poubelles dans la zone de trie: <strong>{nbPoubellesDansZoneDeTrie}</strong></p>
            <div style={{display:"inline"}}>
                <div>
                    <Doughnut data={dataPie} width={300}
                              height={100}/>
                </div>
                <div style={{marginLeft:"10px"}}>
                    <Select
                        options={options}
                        value={options[0]}
                        selected={options[0]}
                    />
                    <Line data={dataLine} width={500} />
                </div>
            </div>
        </div>  ;

        const ZoneInfluence = ({nom,nbPoubellesDansZone,dataBar,lat,long})=><div>
            <p><a onClick={()=>this._onChangeCenterMap(lat,long)}><strong>{nom}</strong></a> Statisques connues : </p>
            <p>Nombre de poubelles dans la zone : <strong>{nbPoubellesDansZone}</strong></p>
            <Bar
                data={dataBar}
                width={600}
                height={10}
                options={{
                    maintainAspectRatio: false
                }}
                style={{MarginLeft:"10px"}}
            />
        </div>;


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
                  <li className={"menu-text"}>
                      <a onClick={()=>this._onChangeMenu("trie")} style={{color:color(this.state.menu.trie),pointerEvents:disable(this.state.menu.trie)}}>Tries</a>
                  </li>
                  <li className={"menu-text"}>
                      <a onClick={()=>this._onChangeMenu("afluance")} style={{color:color(this.state.menu.afluance),pointerEvents:disable(this.state.menu.afluance)}}>Afluances</a>
                  </li>
              </ul>
          </div>;
        };

        const poubellesInfo = ()=>{
          const idDepart = parseInt(this.state.NbMaxElementByPage.poubelles*(this.state.pageMenu.poubelles-1));
          let inc = this.state.NbMaxElementByPage.poubelles;
          let tab=[];
          for(let i=idDepart;i<this.listPoubelle(this.state.idGraph).length;i++){
              if(inc>0){
                  tab.push(this.listPoubelle(this.state.idGraph)[i]);
                  inc--;
              }
          }
          return poubellesDisplayInfo(tab);
        };

        const poubellesDisplayInfo=(tab)=>tab.map(poubelle=>(
            <Poubelle
                nom={poubelle.nom}
                directionPhrase={poubelle.direction}
                battery={poubelle.battery}
                charge={poubelle.charge}
                lat={poubelle.graph.lat}
                long={poubelle.graph.long}
            />
        ));

        const triesInfo = ()=>{
            const idDepart = parseInt(this.state.NbMaxElementByPage.trie*(this.state.pageMenu.trie-1));
            let inc = this.state.NbMaxElementByPage.trie;
            let tab=[];
            for(let i=idDepart;i<this.listZoneTrie(this.state.idGraph).length;i++){
                if(inc>0){
                    tab.push(this.listZoneTrie(this.state.idGraph)[i]);
                    inc--;
                }
            }
            return triesDisplayInfo(tab);
        };

        const triesDisplayInfo=(tab)=>tab.map(trie=>(
            <ZoneDeTrie
                nom={trie.nom}
                nbPoubellesDansZoneDeTrie={trie.nbPoubelleDansZone}
                dataPie={trie.dataPie}
                dataLine={trie.dataLine}
                lat={trie.graph.lat}
                long={trie.graph.long}
            />
        ));

        const afluancesInfo = ()=>{
            const idDepart = parseInt(this.state.NbMaxElementByPage.afluance*(this.state.pageMenu.afluance-1));
            let inc = this.state.NbMaxElementByPage.afluance;
            let tab=[];
            for(let i=idDepart;i<this.listZoneAfluance(this.state.idGraph).length;i++){
                if(inc>0){
                    tab.push(this.listZoneAfluance(this.state.idGraph)[i]);
                    inc--;
                }
            }
            return AfluanceDisplayInfo(tab);
        };

        const AfluanceDisplayInfo=(tab)=>tab.map(zoneAfluence=>(
            <ZoneInfluence
                nom={zoneAfluence.nom}
                nbPoubellesDansZone={zoneAfluence.nbPoubelleDansZone}
                dataBar={zoneAfluence.dataBar}
                lat={zoneAfluence.graph.lat}
                long={zoneAfluence.graph.long}
            />
        ));


        const affichageInfo = () =>{
          let retour;
          let nbMaxPagePoubelle = this.state.NbMaxElementByPage.poubelles;
          let nbMaxPageTrie = this.state.NbMaxElementByPage.trie;
          let nbMaxPageAffluence = this.state.NbMaxElementByPage.afluance;
          if(this.state.menu.poubelle) {
            retour=<div><h3>Les Poubelles : </h3>{poubellesInfo()}<div >
                <Pagination style={{marginLeft:"20vh"}} onChange={this._onChangePagePoubelle} total={this.listPoubelle(this.state.idGraph).length} defaultPageSize={nbMaxPagePoubelle} current={this.state.pageMenu.poubelles}/>
            </div></div>;
          }else if (this.state.menu.trie){
              retour = <div>{triesInfo()}<Pagination style={{marginLeft:"20vh"}} onChange={this._onChangePageTrie} total={this.listZoneTrie(this.state.idGraph).length} defaultPageSize={nbMaxPageTrie} current={this.state.pageMenu.trie}/></div>;
          }else{
              retour = <div>{afluancesInfo()}<Pagination style={{marginLeft:"20vh"}} onChange={this._onChangePageAfluence} total={this.listZoneAfluance(this.state.idGraph).length} defaultPageSize={nbMaxPageAffluence} current={this.state.pageMenu.afluance}/></div>;
          }
          return retour;
        };

        const ZoneInfluenceDisplayGraph = this.listZoneAfluance(this.state.idGraph).map(zoneAfluence =>(
            <ZoneInfluenceGraph
                lat={zoneAfluence.graph.lat}
                lng={zoneAfluence.graph.long}
                text={zoneAfluence.nom}
                diametre={zoneAfluence.graph.diametre}
            />
        ));

        const PoubelleDisplayGraph = this.listPoubelle(this.state.idGraph).map(poubelle =>(
            <PoubelleGraph
                lat={poubelle.graph.lat}
                lng={poubelle.graph.long}
                text={poubelle.nom}
            />
        ));

        const ZoneTrieDisplayGraph = this.listZoneTrie(this.state.idGraph).map(trie =>(
            <ZoneDeTrieGraph
                lat={trie.graph.lat}
                lng={trie.graph.long}
                text={trie.nom}
            />
        ));

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
                        >
                            {ZoneInfluenceDisplayGraph}

                            {PoubelleDisplayGraph}

                            {ZoneTrieDisplayGraph}
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