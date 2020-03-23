import React from 'react';
import { StyleSheet,View } from 'react-native';
import {
  Layout,
  Select,
} from '@ui-kitten/components';
import HeatMap from '../HeatMap'
import StateMap from '../StateMap'
import {getMarkers} from '../InfectedMap'


const data = [
{ text: 'Heat Map'
},
{ text: 'State Map'},
{ text: 'Cluster Map'},
];

export const Menu = ({setOption,selectedOption}) => {

  return (
      <Select
        data={data}
       // style={styles.container}
        //multiSelect={true}
        selectedOption={selectedOption}
        onSelect={setOption}
      />
   
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right:100,
    top: 50,
    width: 200,
    height: 50,
    borderRadius: 100,
  },
});
