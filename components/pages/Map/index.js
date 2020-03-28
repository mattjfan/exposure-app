import React from 'react';
import {StyleSheet,View,Dimensions} from 'react-native'
import {getStates} from './StateMap'
import {getInfectedMaps} from './InfectedMaps'
import MapView from 'react-native-map-clustering'
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Select,Text } from '@ui-kitten/components';



const Menu = ({setOption,selectedOption}) => {
  const data=[
    { text: 'Heat Map'
    },
    { text: 'State Map'},
    { text: 'Cluster Map'},
    ]
  return (
      <Select
        data={data}
        placeHolder={(<Text>{selectedOption.txt}}</Text>)}
        selectedOption={selectedOption}
        onSelect={setOption}
      />
  );
};


const mapStyle=
    [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]





export default class extends React.Component {
    state = { selected: {text: 'Heat Map'},
                         map: 'Heat Map' }

    async componentDidMount () {
        navigator.geolocation.getCurrentPosition(
            location => this.setState({location}) )
        const States= await getStates()
        const {Markers,HeatMap} = await getInfectedMaps()
        this.setState({States,Markers,HeatMap,ready:true})
    }

    setOption=(option)=>{
      this.setState({selected: option,
                      map: option.text})
    }

    render() {
        const { location } = this.state
        return (

            <React.Fragment>
            {this.state.location != null &&
                <MapView
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                style={{...StyleSheet.absoluteFillObject, flex: 1}}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                clusterColor='red'
                showsUserLocation
              >
{this.state.ready &&
  (
    <React.Fragment>
            {this.state.map=='State Map' && 
              (this.state.States) }
            {this.state.map=='Heat Map' && 
              (this.state.HeatMap) }
            {this.state.map=='Cluster Map' &&
              (this.state.Markers) }

  </React.Fragment>
  )             
            } 
            </MapView>
            }

            <View style={style.container}>
              <Menu 
              setOption={this.setOption}
              selectedOption={this.state.selected} 
              />
              </View>
            </React.Fragment> 
           
            
        )
    }
   
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const style=StyleSheet.create({
  container: {
    position: "absolute",
    right: windowWidth*0.25 ,
    top: windowHeight*0.065,
    width: windowWidth*0.5,
    height: windowHeight*0.1,
    borderRadius: 1000,
  },
})