import React from 'react'
import * as api from '../../../../api'
import { Icon } from '@ui-kitten/components';
import {Marker} from 'react-native-maps'


export const getMarkers=()=>{
    const Markers= []
    const infected=api.location.getInfected() 
    infected.forEach((c,index)=>{
        Markers.push(
        <Marker
          coordinate={{ latitude: parseFloat(c[1]),
                         longitude: parseFloat(c[2])}}
          tracksViewChanges={false}
          key={`marker${index}`}
          icon={require('./SMALLRONA3.png')}
          /> ) 
  } )
  return Markers
  }
