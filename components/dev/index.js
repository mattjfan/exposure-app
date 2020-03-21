import React from 'react'
import { Layout, Text, Datepicker, Button } from '@ui-kitten/components';
import * as api from '../../api';
export default class Dev extends React.Component{
    updateLocation = () => api.location.updateLocation()
    render () {
        return (
        <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20}}>
            <Button onPress={this.updateLocation}>Update Location</Button>
        </Layout>
        )
    }
}
