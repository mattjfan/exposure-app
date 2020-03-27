import React from 'react'
import MapView from 'react-native-maps'


const Gradient = {
    colors: ['#7F0000','#A31010','#C42727','#F24848','#FF6666'].reverse(),
    startPoints: [0,0.25,0.5,0.75,1],
    colorMapSize: 100
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
        heatmapMode={"POINTS_WEIGHT"}
        onZoomRadiusChange={{
                                   zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                                   radius: [10, 10, 15, 20, 30, 60, 80, 100, 120, 150, 180, 200, 250, 250]
                                }}
        maxIntensity={100}
        gradientSmoothing={10}
        gradient={Gradient}
                                />
 )
}