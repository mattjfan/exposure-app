import React from 'react'
import MapView from 'react-native-maps'
import * as api from '../../../../api'


export default class extends React.Component {
   state={heat_data: null}
render(){
    return(
        <React.Fragment>
            {this.state.heat_data && 
            <MapView.Heatmap 
            points={this.state.heat_data}
                                    heatmapMode={"POINTS_WEIGHT"}
                                    //opacity={1}
                                    onZoomRadiusChange={{
                                        zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                                        radius: [10, 10, 15, 20, 30, 60, 80, 100, 120, 150, 180, 200, 250, 250]
                                     }}
                                    maxIntensity={100}
                                    gradientSmoothing={10}
                                    />
            }
        </React.Fragment>
    )
}

componentDidMount(){
// api.jhu_data.getJHUCSV()
// .then((heat_data)=>this.setState({heat_data}))
const cur = new Date()
const heat_data=api.location.getInfected().map((data)=>{
console.log(Date.parse(data[3])-cur)
return {
    latitude: data[1],
    longitude: data[2],
    weight:cur-Date.parse(data[3])
}
} )
this.setState({heat_data},_=>console.log(heat_data))
}
}

export const getHeatMap = () =>{
    const cur = new Date()
    const beg= Date.parse('2019-03-20')
    const time = cur-beg
    const heat_data=api.location.getInfected().map((data)=>{
    return {
        latitude: parseFloat(data[1]),
        longitude: parseFloat(data[2]),
        weight: Date.parse(data[3])-Date.parse('2019-03-20')
    }
    })
    const  points = [0.2,0.4,0.6,0.8,.9]
    console.log(heat_data[0].weight)
    return (<MapView.Heatmap 
                 points={heat_data}
                 heatmapMode={"POINTS_WEIGHT"}
                onZoomRadiusChange={{
                                   zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                                   radius: [10, 10, 15, 20, 30, 60, 80, 100, 120, 150, 180, 200, 250, 250]
                                }}
                  maxIntensity={100}
                  gradientSmoothing={10}
                   gradient={ {
                      colors: ['#7F0000','#A31010','#C42727','#F24848','#FF6666'].reverse(),
                       startPoints: points,
                      colorMapSize: 100
                  }
                 }
                                />)


}