import React from 'react'
import MapView from 'react-native-maps'
import * as api from '../../../../api'


export default class extends React.Component {
   state={heat_data: null}
render(){
    return(
        <React.Fragment>
            {this.state.heat_data && 
            <MapView.Heatmap points={this.state.heat_data}
                                    heatmapMode={"POINTS_WEIGHT"}
                                    opacity={1}
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
api.jhu_data.getJHUCSV()
.then((heat_data)=>this.setState({heat_data}))
//this.setState({heat_data},_=>console.log(heat_data))
}
}
/*onZoomRadiusChange={{
                                        zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
                                        radius: [10, 10, 15, 20, 30, 60, 80, 100, 120, 150, 180, 200, 250, 250]
                                     }}
                                    gradient={{
                                        colors: ["#79BC6A", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
                                        values: [0, 0.25, 0.50, 0.75, 1]}}
                                    maxIntensity={100}
                                    gradientSmoothing={10}
                                    heatmapMode={"POINTS_WEIGHT"}
                                    opacity={1}*/