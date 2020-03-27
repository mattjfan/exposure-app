import React from 'react'
import {Marker} from 'react-native-maps'


const MyMarker=({latitude,longitude,index})=>(
  <Marker
  coordinate={{ latitude, longitude } }
  tracksViewChanges={true}
  key={index}
  icon={require('./bioHazard.png')}
  />
)

export const getMarkers = (data) =>{
  let Markers=[]
   
  data.locations.forEach(({latitude,longitude},index)=>{
  
    Markers.push(<MyMarker latitude={parseFloat(latitude)} longitude={parseFloat(longitude)} index={index}/>)

  })

  return Markers
  } 


  
