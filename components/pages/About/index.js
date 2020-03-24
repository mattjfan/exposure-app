import React from 'react';
// import { View, Text } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import * as api from '../../../api'

export default class extends React.Component {

    render() {
        return (
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20}}>
                <Text category='h4' style={{paddingBottom: 20}}>About this app</Text>
                <Text style={{textAlign: 'center'}}>
                    We designed this app as a simple way to track and manage your exposure risk during the COVID-19 pandemic.
                    While officials recommend people to avoid contact with others to slow the spread of the virus, we realize that
                    some human contact is probably inevitable.{"\n\n"}
                    Our app uses background location tracking to monitor your exposure to other people who have downloaded our app,
                    and records information on people you've come in contact with. If someone you've come in contact with reports
                    symptoms or a confirmed case, everyone that they've come in contact with is notified. {"\n\n"}
                    We also use aggregated and summarized data to construct exposure maps to help illustrate known exposure risks and
                    inform people. We only collect this data in the case of self-reported confirmed cases or symptoms, and data is anonymized,
                    aggregated, and summarized for user privacy.
                </Text>
            </Layout>
        )
    }
}