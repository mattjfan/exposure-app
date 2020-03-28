import React from 'react'
import {getHeatMap} from './HeatMap'
import {getMarkers} from './ClusterMap'
import * as api from '../../../../api'

export const getInfectedMaps= async () => {
    
    let data= await api.location.getInfected()

    HeatMap=getHeatMap(data)
    Markers=getMarkers(data)

    return {HeatMap,Markers}
}