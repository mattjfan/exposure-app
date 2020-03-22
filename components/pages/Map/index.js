import React from 'react';
import {StyleSheet,View} from 'react-native'
import HeatMap from './HeatMap'
import StateMap from './StateMap'
import {getMarkers} from './InfectedMap'
import MapView from 'react-native-map-clustering'
import { PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Layout, Text, Toggle } from '@ui-kitten/components';
import usstates from './gz_2010_us_040_00_5m.json'
import * as api from '../../../api'
import {Menu} from './OverLayMenu'

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
const States=[]

const Markers = getMarkers()

const Maps = [HeatMap,StateMap, Markers]
 

 
export default class extends React.Component {
    state = { location: undefined,
               map: '' }
    componentDidMount () {
        navigator.geolocation.getCurrentPosition(
            location => this.setState({location})
        )
      
    }
    setOption=(option)=>{
      this.setState({map: option.text})
    }
    render() {
        const { location } = this.state
        return (
            // <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Text>
            //         Exposure Map
            //     </Text>
            // </Layout>
            <React.Fragment>
            {this.state.location != null &&
                <MapView
                provider={PROVIDER_GOOGLE}
                customMapStyle={mapStyle}
                //style={{...StyleSheet.absoluteFillObject, flex: 1}}
                style={{flex:1}}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                clusterColor='red'
                showsUserLocation
              >
  
              <Callout style={style.calloutSearch} >
              <View style={style.calloutView}>
              <Menu setOption={this.setOption}
                    selectedOption={this.state.map}
              />
              </View>
              </Callout>

            {this.state.map=='State Map' &&
              <StateMap/> }
            {this.state.map=='Heat Map' && 
            <HeatMap/> }
          {this.state.map=='Cluster Map' &&
             <Markers/> }

            </MapView> }
              </React.Fragment>
            
        )
    }
}
const style=StyleSheet.create({
  container: {
    position: "absolute",
    right:50,
    top: 50,
    width: 200,
    height: 50,
    borderRadius: 100,
  },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    marginTop: 20
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 50,
    borderWidth: 0.0  
  }
})