import React from 'react'
import usstates from '../gz_2010_us_040_00_5m.json'
import * as api from '../../../../api'
import {Geojson} from 'react-native-maps'

const States=[]


const DataDict=(data)=>{
    let dict = {}
    let max=0
    data.forEach((ex)=>{
        max = max>=ex.weight ? max : ex.weight
        dict[ex.name]=ex.weight }
    )
    return {dict,max}
}

export default class extends React.Component {
    componentDidMount(){
        api.jhu_data.getJHUCSV().then(data=>{
            const {dict,max} = DataDict(data)
            console.log(dict)
            usstates.features.forEach((state,index)=>{
                //console.log(color)
                let name = state.properties['NAME']
                console.log(name)
                let alpha=dict[name]/max
                let data={type: 'FeatureCollection'}
                data.features=[state]
                States.push(<Geojson 
                    geojson={data} 
                    strokeColor="black"
                    fillColor={`rgba(200, 0, 0, ${0.3+(0.2*alpha)})`}
                    strokeWidth={2}
                    key={index} 
                    />)
            })   
        })  
    }
    render(){
        return(
            <React.Fragment>
            {States}
            </React.Fragment>
            )
    }
}