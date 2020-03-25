import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import {View} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import * as api from '../../../api';
import { createStackNavigator } from '@react-navigation/stack';
import Invite from './invite';
import Scan from './scan';
import Loading from '../Loading';

const Stack = createStackNavigator();

export default class stack extends React.Component {
    // eventually, add state to manage header visibility
    render () {
        return (
            <Stack.Navigator initialRouteName="Log Contacts">
                <Stack.Screen options={{ headerShown: false }} name='Log Contacts' component={Main} />
                <Stack.Screen name='Scan Contact' component={Scan} options={{headerStyle: {backgroundColor: '#222B45', elevation: 0, shadowOpacity: 0}, headerTintColor:'white', headerTitleStyle: {fontWeight: 'bold'}}}/>
                <Stack.Screen name='Invite New User' component={Invite} options={{headerStyle: {backgroundColor: '#222B45', elevation: 0, shadowOpacity: 0}, headerTintColor:'white', headerTitleStyle: {fontWeight: 'bold'}}}/>
            </Stack.Navigator>
        )
    }
}
class Main extends React.Component {
    state = {myIdentifier: undefined }

    componentDidMount() {
        api.storage.writeSerializedIdentifier().then(
            myIdentifier => this.setState({myIdentifier})
        )
    }

    goToInviteNew = () => this.props.navigation.navigate('Invite New User')
    goToScanContact = () => this.props.navigation.navigate('Scan Contact')
    render() {
        return this.state.myIdentifier ?
            (<Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{marginBottom: 20}} category="h4">
                    Log Exposures
                </Text>
                    <View style={{backgroundColor: 'white', padding: 12}}><QRCode size={200} value={this.state.myIdentifier} /></View>
                <Button style={{marginTop: 20, width: 224}} onPress={this.goToScanContact}>Scan Contact</Button>
                <Button style={{marginTop: 20, width: 224}} onPress={this.goToInviteNew}>Invite New Contact</Button>
            </Layout>)
            : <Loading />
    }
}