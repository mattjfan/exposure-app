import React from 'react'
import usstates from '../gz_2010_us_040_00_5m.json'
import * as api from '../../../../api'
import {Geojson} from 'react-native-maps'

const States=[]


const DataDict=(data)=>{
    let dict = {}
    let max=0
    data.forEach((ex)=>{
        console.log('OH,HELO')
        console.log(ex.weight)
        //max = max>=ex.weight ? max : ex.weight
        dict[ex.name]=ex.weight }
    )
    usstates.features.forEach((state)=>{

        let name=state.properties['NAME']
        let infections_per_100k=dict[name]/(state.properties['Population']/1000)
        console.log(name, ' Infections: ', infections_per_100k)
        if(!isNaN(infections_per_100k)){
        max= max > infections_per_100k ? max : infections_per_100k }
        dict[name]= infections_per_100k
    })
    return {dict,max}
}

export default class extends React.Component {
    componentDidMount(){
        api.jhu_data.getJHUCSV().then(data=>{
            const {dict,max} = DataDict(data)
           
            usstates.features.forEach((state,index)=>{
                //console.log(color)
                let name = state.properties['NAME']
                
                let alpha=dict[name]/max
                console.log('max ', name, ' ', max)
                console.log('alpha ', name, ' ', alpha)
                let data={type: 'FeatureCollection'}
                data.features=[state]
                States.push(<Geojson 
                    geojson={data} 
                    //strokeColor="black"
                    fillColor={`rgba(200, 0, 0, ${alpha*0.9})`}
                    strokeWidth={0}
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