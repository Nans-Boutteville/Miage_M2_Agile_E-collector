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

const Poubelle = ({nom,directionPhrase,battery,charge, isCharging=false})=><div>
    <p><strong>{nom}</strong> {directionPhrase}</p>
    <p>{charging(isCharging,battery)}{battery}%
        <Charges size="2rem" icon={""+charge} />{charge}% de charges</p>
    <p> </p>
</div>;

const options = [
    { value: 'month', label: 'Par mois' },
    { value: 'year', label: 'Par année' },
    { value: 'week', label: 'Par semaine' }
];

const ZoneDeTrie = ({nom,nbPoubellesDansZoneDeTrie,dataPie,dataLine})=><div>
    <p><strong>{nom}</strong> Statistiques : </p>
    <p>Nombre de poubelles dans la zone de trie: <strong>{nbPoubellesDansZoneDeTrie}</strong></p>
    <div style={{display:"inline"}}>
        <div>
            <Doughnut data={dataPie} width={300}
                      height={100}/>
        </div>
        <div style={{marginLeft:"10px"}}>
            <Select
                options={options}
            />
            <Line data={dataLine} width={400} />
        </div>
    </div>
</div>  ;

const ZoneInfluence = ({nom,nbPoubellesDansZone,dataBar})=><div>
    <p><strong>{nom}</strong> Statisques connues : </p>
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

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const dataBar = {
    labels: ['13h', '14h', '15h', '16h', '17h', '18h', '19h'],
    datasets: [
        {
            label: 'Nombre de personnes',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};


const getState = () => ({
        labels: [
            'Plastiques',
            'Verres',
            'Non-Recyclable'
        ],
        datasets: [{
            data: [getRandomInt(50, 200), getRandomInt(100, 150), getRandomInt(150, 250)],
            backgroundColor: [
                '#36A2EB',
                '#00FF00',
                '#CCC'
            ],
            hoverBackgroundColor: [
                '#36A2EB',
                '#00FF00',
                '#CCC'
            ]
        }]

});

const initialState = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Nombres de détritus jetées',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

export default class Client extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            menu : {
                poubelle : true,
                trie:false,
                afluance:false
            },
           pie: getState(),
            line: initialState,
            bar:dataBar,
            idGraph:0,
            pageMenu : {
                poubelles:1,
                trie:1,
                afluance:1
            }
        };
    }

    componentWillMount() {
        setInterval(() => {
            this.setState({pie:getState()});
        }, 5000);
    };


    componentDidMount(){

        let _this = this;

        setInterval(function(){
            let oldDataSet = _this.state.line.datasets[0];
            let newData = [];

            for(let x=0; x< _this.state.line.labels.length; x++){
                newData.push(Math.floor(Math.random() * 100));
            }

            var newDataSet = {
                ...oldDataSet
            };

            newDataSet.data = newData;

            var line = {
                ...initialState,
                datasets: [newDataSet]
            };

            _this.setState({line:line});
        }, 5000);
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
                            nom:"P1",
                            direction:"se dirige vers Z3",
                            battery :100,
                            charge:25,
                            isCharging:false,
                            graph : {
                                lat:43.71989225310265,
                                long:7.275623913033314,
                            }
                    },{
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
                    zoneDAfluence:[
                        {
                            nom:"A1",
                            nbPoubelleDansZone:1,
                            dataBar:this.state.bar,
                            graph : {
                                lat:43.71995511362731,
                                long:7.276731660849009,
                                diametre:100
                            }
                        },
                        {
                            nom:"A2",
                            nbPoubelleDansZone:1,
                            dataBar:this.state.bar,
                            graph : {
                                lat:43.720105641533365,
                                long:7.277928739864365,
                                diametre:40
                            }
                        },
                        {
                            nom:"A3",
                            nbPoubelleDansZone:0,
                            dataBar:this.state.bar,
                            graph : {
                                lat:43.72058731928579,
                                long:7.277028112987523,
                                diametre:60
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


    listZoneAfluance(id){
        return this.listGraph()[id].elements.zoneDAfluence;
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

        let color = (boolean) =>{
            if(boolean){
                return "black";
            }else{
                return ""
            }
        };

        const menu = () =>{
          return  <div className="top-bar">
              <ul className="dropdown menu" data-dropdown-menu>
                  <li className="menu-text">
                      <a onClick={()=>this._onChangeMenu("poubelle")} style={{color:color(this.state.menu.poubelle)}}>Poubelles</a>
                  </li>
                  <li className={"menu-text"}>
                      <a onClick={()=>this._onChangeMenu("trie")} style={{color:color(this.state.menu.trie)}}>Tries</a>
                  </li>
                  <li className={"menu-text"}>
                      <a onClick={()=>this._onChangeMenu("afluance")} style={{color:color(this.state.menu.afluance)}}>Afluances</a>
                  </li>
              </ul>
          </div>;
        };

        const poubellesInfo = this.listPoubelle(this.state.idGraph).map(poubelle => (
                <Poubelle
                    nom={poubelle.nom}
                    directionPhrase={poubelle.direction}
                    battery={poubelle.battery}
                    charge={poubelle.charge}
                />
            ));

        const triesInfo  = this.listZoneTrie(this.state.idGraph).map(trie => (
                <ZoneDeTrie
                    nom={trie.nom}
                    nbPoubellesDansZoneDeTrie={trie.nbPoubelleDansZone}
                    dataPie={trie.dataPie}
                    dataLine={trie.dataLine}
                />
            ));

        const afluancesInfo = this.listZoneAfluance(this.state.idGraph).map(zoneAfluence =>(
                <ZoneInfluence
                nom={zoneAfluence.nom}
                nbPoubellesDansZone={zoneAfluence.nbPoubelleDansZone}
                dataBar={zoneAfluence.dataBar}

                />
            ));

        const affichageInfo = () =>{
          let retour;
          let nbMaxPagePoubelle = 5;
          let nbMaxPageTrie = 1;
          let nbMaxPageAffluence = 2;
          if(this.state.menu.poubelle) {
            retour=<div><h3>Les Poubelles : </h3>{poubellesInfo}<div style={{textAlign:"center"}}>
                <Pagination onChange={this._onChangePagePoubelle} total={this.listPoubelle(this.state.idGraph).length} defaultPageSize={nbMaxPagePoubelle} current={this.state.pageMenu.poubelles}/>
            </div></div>;
          }else if (this.state.menu.trie){
              retour = <div>{triesInfo}<Pagination onChange={this._onChangePageTrie} total={this.listZoneTrie(this.state.idGraph).length} defaultPageSize={nbMaxPageTrie} current={this.state.pageMenu.trie}/></div>;
          }else{
              retour = <div>{afluancesInfo}<Pagination onChange={this._onChangePageAfluence} total={this.listZoneAfluance(this.state.idGraph).length} defaultPageSize={nbMaxPageAffluence} current={this.state.pageMenu.afluance}/></div>;
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

        const centerMap = {
            lat:this.listGraph()[this.state.idGraph].lat,
            lng:this.listGraph()[this.state.idGraph].long
        };


        return (
            <div>
                <h2 style={{textAlign:"center"}}>{this.listGraph()[this.state.idGraph].nomAdr}</h2>
                <div style={{display:"flex"}}>
                    <div style={{ height: '80vh', width: '60%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDv33SIPUfRDQShB-PJA7pzjwCsnFnZ6mY"}}
                            defaultCenter={centerMap}
                            defaultZoom={this.listGraph()[this.state.idGraph].zoom}
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