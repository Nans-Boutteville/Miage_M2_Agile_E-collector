const K_WIDTH = 35;
const K_HEIGHT = 35;

export const PoubelleStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid #f44336',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};


export const ZoneDeTrieStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: 40,
    height: 20,
    left: -40 / 2,
    top: -20 / 2,

    backgroundColor: 'blue',
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};


export const RouteStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid green',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
}

export let Battery = (pourcentage)=>{
    return{
        width : pourcentage+"px"
    }

};

export let  ZoneInfluStyle = (C1)=> {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates
   return {
       position: 'absolute',
       textAlign: 'center',
    width: C1,
    height: C1,
    left: -C1 / 2,
    top: -C1 / 2,

    border: '1px solid yellow',
    opacity: 0.5,
    borderRadius: C1,
    backgroundColor: 'yellow',

    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
   }
};




