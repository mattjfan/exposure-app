import React from 'react'
import MapView from 'react-native-maps'


const Gradient = {
    colors: ['#7F0000','#FF6666'].reverse(),
    startPoints: [0,1],
    colorMapSize: 2
     }

export const getHeatMap = (data) =>{
    let heat_data=data.locations.map(({latitude,longitude})=>{ 
        latitude=parseFloat(latitude)
        longitude=parseFloat(longitude)
        return {latitude,longitude} } )

    console.log('HEAT DATA', heat_data)

    return (
        <MapView.Heatmap 
        points={heat_data}
        //heatmapMode={"POINTS_DENSITY"}
        onZoomRadiusChange={{
                                    zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                                    radius: [10, 10, 15, 20, 30, 60, 80, 100, 120, 150, 180, 200, 250, 250]
                                }}
        maxIntensity={100}
    //    radius={0}
     //  gradientSmoothing={100}
     //   gradient={Gradient}
                                />
 )
}