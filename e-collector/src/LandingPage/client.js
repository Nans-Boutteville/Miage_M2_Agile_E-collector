import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PoubelleStyle} from '../css/my_great_place_styles.js';
import {ZoneInfluStyle} from '../css/my_great_place_styles.js';
import {ZoneDeTrieStyle} from '../css/my_great_place_styles.js';
import {Battery} from '../css/battery';
import {Charges} from '../css/charges';


const PoubelleGraph = ({ text }) => <div style={PoubelleStyle}> {text}</div>;
const ZoneInfluence= ({ text, diametre}) => <div style={ZoneInfluStyle(diametre)}> {text}</div>;
const ZoneDeTrie= ({ text}) => <div style={ZoneDeTrieStyle}> {text}</div>;

let charging = (isCharging,battery)=>{
    if(isCharging){
        return <Battery size="2rem" icon={"charging-"+battery} />
    }else{
       return <Battery size="2rem" icon={""+battery} />
    }
}

const Poubelle = ({nom,directionPhrase,battery,charge, isCharging=false})=><div>
    <p><strong>{nom}</strong> {directionPhrase}</p>
    <p>{charging(isCharging,battery)}{battery}%
        <Charges size="2rem" icon={""+charge} />{charge}% de charges</p>
    <p> </p>
</div>;

export default class Client extends React.Component {
    static defaultProps = {
        center: {
            lat: 43.71995511362731,
            lng: 7.276731660849009
        },
        zoom: 18
    };



    render(){
        return (
            <div style={{display:"flex"}}>
                <div style={{ height: '80vh', width: '60%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyDv33SIPUfRDQShB-PJA7pzjwCsnFnZ6mY"}}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >

                        <ZoneInfluence
                            lat={43.71995511362731}
                            lng={7.276731660849009}
                            text={'Z1'}
                            diametre={100}
                        />

                        <ZoneInfluence
                            lat={43.720105641533365}
                            lng={7.277928739864365}
                            text={'Z2'}
                            diametre={40}
                        />

                        <ZoneInfluence
                            lat={43.72058731928579}
                            lng={7.277028112987523}
                            text={'Z3'}
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

                        <ZoneDeTrie
                            lat={43.72076565945867}
                            lng={7.277072369436269}
                            text={'T1'}
                        />



                    </GoogleMapReact>
                </div>
                <div style={{ height: '80vh', width: '40%', textAlign:"center" }}>
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
                </div>
            </div>
        );
    }
}