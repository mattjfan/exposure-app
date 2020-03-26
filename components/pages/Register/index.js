import React from 'react';
import {Input, Layout, Text, Button} from '@ui-kitten/components';
import * as api from '../../../api';

export default class Register extends React.Component {
    state = {loading: false, phoneNumber: ''}
    setPhoneNumber = phoneNumber => (/^\d*$/g.test(phoneNumber)) && this.setState({ phoneNumber });

    signup = () => {
        this.setState({loading: true},
            () => /^\d{10,}$/g.test(this.state.phoneNumber)
            && api.storage.getNewIdentifier(this.state.phoneNumber)
            .then(this.props.onSubmit)
            .catch(() => this.setState({loading: false}))
        );

    };

    render () {
        const { loading } = this.state;
        return (
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20}}>
                <Text category='h4' style={{marginBottom: 12}}>
                    Register your device
                </Text>
                <Text>Your number helps us to check for previous reported contacts, and to uniquely identify your device.</Text>
                <Input
                            label="phone number"
                            style={{ marginBottom: 20, marginTop: 32}}
                            value={this.state.phoneNumber}
                            onChangeText={this.setPhoneNumber}
                />
                <Button style={{width: '100%'}} onPress={this.signup} disabled={loading}>Register device</Button>
        
            </Layout>
        )
    }
}