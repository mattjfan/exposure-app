import React from 'react';
import {StyleSheet,View,Dimensions} from 'react-native'
import {getHeatMap} from './HeatMap'
import StateMap,{getStates} from './StateMap'
import {getMarkers} from './InfectedMap'
import MapView from 'react-native-map-clustering'
import { PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Layout, Text, Toggle, Select } from '@ui-kitten/components';
import * as api from '../../../api'


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
        placeHolder={selectedOption.text}
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

const States= getStates()
const Markers= getMarkers()
const HeatMap= getHeatMap() 


export default class extends React.Component {
    state = { selected: {location: 'Heat Map'},
                         map: 'Heat Map' }
    componentDidMount () {
        navigator.geolocation.getCurrentPosition(
            location => this.setState({location})
        )
      
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
                //style={{flex:1}}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                clusterColor='red'
                showsUserLocation
              >

            {this.state.map=='State Map' &&
              (States) }
            {this.state.map=='Heat Map' && 
            (HeatMap) }
          {this.state.map=='Cluster Map' &&
             (Markers) }

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