import React from 'react'
import { Layout, Text, Datepicker, Button } from '@ui-kitten/components';
import * as api from '../../api';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
export default class Dev extends React.Component{
    updateLocation = () => api.location.updateLocation()
    render () {
        return (
        <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20}}>
            <Button onPress={this.updateLocation}>Update Location</Button>
            <Button onPress={api.location.updateContactedPeersWithCachedLocation}>Get Contacted Peers</Button>
            <Button onPress={() => TaskManager.getRegisteredTasksAsync().then(x => console.log(x))}>Log Tasks</Button>
            <Button onPress={TaskManager.unregisterAllTasksAsync}>Unregister Tasks</Button>
            <Button onPress={api.storage.deleteIdentifier}>Delete Identifier</Button>
            
        </Layout>
        )
    }
}
