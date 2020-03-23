import React from 'react'
//import {UsStates as usstates} from '../usStates'
import usstates from '../gz_2010_us_040_00_20m.json'
import * as api from '../../../../api'
import MapView, {Geojson} from 'react-native-maps'

const States=[]


const DataDict=(data)=>{
    let dict = {}
    let max=0
    data.forEach((ex)=>{
        let name=ex.name
        let infections_per_100k=ex.weight/StatePop[name]
        if(!isNaN(infections_per_100k)){
            max= max > infections_per_100k ? max : infections_per_100k }
        dict[name]= infections_per_100k }
    )
    return {dict,max}
}
export const getStates = () =>{
    api.jhu_data.getJHUCSV().then(data=>{
        const {dict,max} = DataDict(data)
        usstates.features.forEach((state,index)=>{
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
                key={`geoJSON${index}`} 
                />)
        })   
    }) 
    return (States)
}

const StatePop={
    "Alabama": 4903185,
    "Alaska": 731545,
    "Arizona": 7278717,
    "Arkansas": 3017804,
    "California": 39512223,
    "Colorado": 5758736,
    "Connecticut": 3565287,
    "Delaware": 973764,
    "District of Columbia": 705749,
    "Florida": 21477737,
    "Georgia": 10617423,
    "Hawaii": 1415872,
    "Idaho": 1787065,
    "Illinois": 12671821,
    "Indiana": 6732219,
    "Iowa": 3155070,
    "Kansas": 2913314,
    "Kentucky": 4467673,
    "Louisiana": 4648794,
    "Maine": 1344212,
    "Maryland": 6045680,
    "Massachusetts": 6892503,
    "Michigan": 9986857,
    "Minnesota": 5639632,
    "Mississippi": 2976149,
    "Missouri": 6137428,
    "Montana": 1068778,
    "Nebraska": 1934408,
    "Nevada": 3080156,
    "New Hampshire": 1359711,
    "New Jersey": 8882190,
    "New Mexico": 2096829,
    "New York": 19453561,
    "North Carolina": 10488084,
    "North Dakota": 762062,
    "Ohio": 11689100,
    "Oklahoma": 3956971,
    "Oregon": 4217737,
    "Pennsylvania": 12801989,
    "Rhode Island": 1059361,
    "South Carolina": 5148714,
    "South Dakota": 884659,
    "Tennessee": 6829174,
    "Texas": 28995881,
    "Utah": 3205958,
    "Vermont": 623989,
    "Virginia": 8535519,
    "Washington": 7614893,
    "West Virginia": 1792147,
    "Wisconsin": 5822434,
    "Wyoming": 578759
}