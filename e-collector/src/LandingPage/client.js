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
    static defaultProps = {
        center: {
            lat: 43.71995511362731,
            lng: 7.276731660849009
        },
        zoom: 18
    };

    constructor(props){
        super(props);
        this.state = {
           pie: getState(),
            line: initialState,
            bar:dataBar,
            menu : {
               poubelle : true,
                trie:false,
                afluance:false
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

        const poubellesInfo = <div>
                <h3>Les Poubelles : </h3>
                <Poubelle
                    nom={"P1"}
                    directionPhrase={"se dirige vers Z3"}
                    battery={100}
                    charge={25}
                />
                <Poubelle
                    nom={"P2"}
                    directionPhrase={"s'occupe de Z1"}
                    battery={80}
                    charge={50}
                />
                <Poubelle
                    nom={"P3"}
                    directionPhrase={"s'occupe de Z2"}
                    battery={20}
                    charge={75}
                />
                <Poubelle
                    nom={"P4"}
                    directionPhrase={"se vide et se charge"}
                    isCharging={true}
                    battery={50}
                    charge={100}
                />
                <Poubelle
                    nom={"P5"}
                    directionPhrase={"suit un parcours prédéfinis"}
                    battery={30}
                    charge={25}
                />
                <div style={{textAlign:"center"}}>
                    <Pagination total={25} />;
                </div>
            </div>;

        const triesInfo  =<div>

            <ZoneDeTrie
                nom={"T1"}
                nbPoubellesDansZoneDeTrie={1}
                dataPie={this.state.pie}
                dataLine={this.state.line}
            />
            <div style={{textAlign:"center"}}>
                <Pagination total={25} />;
            </div>
        </div> ;

        const afluancesInfo =
            <div>
                <ZoneInfluence
                    nom={"Z1"}
                    nbPoubellesDansZone={1}
                    dataBar={this.state.bar}

                />
                <ZoneInfluence
                    nom={"Z2"}
                    nbPoubellesDansZone={1}
                    dataBar={this.state.bar}

                />
                <div style={{textAlign:"center"}}>
                    <Pagination total={25} />;
                </div>
                <ZoneInfluence
                    nom={"Z3"}
                    nbPoubellesDansZone={0}
                    dataBar={this.state.bar}

                />
            </div>;

        const affichageInfo = () =>{
          let retour;
          if(this.state.menu.poubelle) {
            retour=poubellesInfo;
          }else if (this.state.menu.trie){
            retour = triesInfo;
          }else{
              retour = afluancesInfo;
          }
          return retour;
        };


        return (
            <div>
                <h2 style={{textAlign:"center"}}>Jardin des Arènes de Cimiez</h2>
                <div style={{display:"flex"}}>
                    <div style={{ height: '80vh', width: '60%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDv33SIPUfRDQShB-PJA7pzjwCsnFnZ6mY"}}
                            defaultCenter={this.props.center}
                            defaultZoom={this.props.zoom}
                        >

                            <ZoneInfluenceGraph
                                lat={43.71995511362731}
                                lng={7.276731660849009}
                                text={'A1'}
                                diametre={100}
                            />

                            <ZoneInfluenceGraph
                                lat={43.720105641533365}
                                lng={7.277928739864365}
                                text={'A2'}
                                diametre={40}
                            />

                            <ZoneInfluenceGraph
                                lat={43.72058731928579}
                                lng={7.277028112987523}
                                text={'A3'}
                                diametre={60}
                            />

                            <PoubelleGraph
                                lat={43.71989225310265}
                                lng={7.275623913033314}
                                text={'P1'}
                            />

                            <PoubelleGraph
                                lat={43.7199628471185}
                                lng={7.276885068490628}
                                text={'P2'}
                            />

                            <PoubelleGraph
                                lat={43.72002391515392}
                                lng={7.278003658367197}
                                text={'P3'}
                            />

                            <PoubelleGraph
                                lat={43.72076565945867}
                                lng={7.277072369436269}
                                text={'P4'}
                            />

                            <PoubelleGraph
                                lat={43.72038439661712}
                                lng={7.277138044431808}
                                text={'P5'}
                            />

                            <ZoneDeTrieGraph
                                lat={43.72076565945867}
                                lng={7.277072369436269}
                                text={'T1'}
                            />



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