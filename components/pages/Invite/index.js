import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import QRCode from 'react-native-qrcode-svg';
import * as api from '../../../api';
import { createStackNavigator } from '@react-navigation/stack';
import Invite from './invite';
import Scan from './scan';

const Stack = createStackNavigator();

export default class stack extends React.Component {
    // eventually, add state to manage header visibility
    render () {
        return (
            <Stack.Navigator initialRouteName="Log Contacts">
                <Stack.Screen name='Log Contacts' component={Main} />
                <Stack.Screen name='Scan Contact' component={Scan} />
                <Stack.Screen name='Invite New User' component={Invite} />
            </Stack.Navigator>
        )
    }
}
class Main extends React.Component {
    state = {myIdentifier: JSON.stringify({ id: 'TEST_IDENTIFIER', name: '@EXPOSURE_APP_JSON_SERIALIZED_ID' }) }

    componentDidMount() {
        api.storage.writeSerializedIdentifier().then(
            myIdentifier => this.setState(myIdentifier)
        )
    }

    goToInviteNew = () => this.props.navigation.navigate('Invite New User')
    goToScanContact = () => this.props.navigation.navigate('Scan Contact')
    render() {
        return (
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{marginBottom: 20}} category="h4">
                    Invite Peeps
                </Text>
                {this.state.myIdentifier && <QRCode size={200} value={this.state.myIdentifier} />}
                <Button style={{marginTop: 20}} onPress={this.goToScanContact}>Scan Contact</Button>
                <Button style={{marginTop: 20}} onPress={this.goToInviteNew}>Invite New Contact</Button>
            </Layout>
        )
    }
}