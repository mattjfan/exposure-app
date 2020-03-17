import React from 'react';
import {StyleSheet} from 'react-native'
import MapView from 'react-native-maps';
import { Layout, Text } from '@ui-kitten/components';

export default class extends React.Component {
    state = { location: undefined }
    componentDidMount () {
        navigator.geolocation.getCurrentPosition(
            location => this.setState({location})
        )
    }
    render() {
        const { location } = this.state
        return (
            // <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Text>
            //         Exposure Map
            //     </Text>
            // </Layout>
            this.state.location != null &&
                <MapView
                style={{...StyleSheet.absoluteFillObject}}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation
              />
            
        )
    }
}