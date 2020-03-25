import React from 'react'
import { Layout, Text, Button, Select } from '@ui-kitten/components';
import * as Contacts from 'expo-contacts';
import * as api from '../../../api';
import Loading from '../Loading';

export default class extends React.Component {
    state = { phone: undefined, contacted: undefined, _phoneContacts: undefined}
    componentDidMount() {
        Contacts.requestPermissionsAsync()
        .then(() => Contacts.getContactsAsync({fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers]}))
        .then(({data}) => this.setState({_phoneContacts: data.map(x => ({...x, text: x.name}))}))
    }

    sendInvitation = () => {
        const { phone, contacted } = this.state;
        if (phone != null && contacted != null) {
            api.inviteFriend(this.state.phone.phoneNumbers[0].number, this.state.contacted.text==='yes')
            this.props.navigation.navigate("Log Contacts")
        }
    }

    render() {
        return (
            this.state._phoneContacts ?
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 32, paddingRight: 32 }}>
                        <Text style={{marginBottom: 20}} category="h4">
                            Invite Contacts
                        </Text>
                        <Select
                            style={{ marginBottom: 20, width: '100%'}}
                            label="Select a contact to invite"
                            data={this.state._phoneContacts}
                            selectedOption={this.state.phone}
                            onSelect={phone => this.setState({phone})}
                        />
                        <Select
                            style={{ marginBottom: 20, width: '100%'}}
                            label="Have you been in physical contact with this person recently?"
                            data={[{text: 'yes'}, {text: 'no'}]}
                            selectedOption={this.state.contacted}
                            onSelect={contacted => this.setState({contacted})}
                        />
                        <Button style={{width: '100%'}} onPress={this.sendInvitation}>Send Invitation</Button>
            </Layout>
            : <Loading />
        )
    }
}