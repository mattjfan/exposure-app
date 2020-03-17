import React from 'react';
// import { View, Text } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import * as api from '../../../api'
export default class extends React.Component {
    state = {status: 'loading', exposureRisk: undefined }
    componentDidMount () {
        api.getExposureRisk()
        .then(({exposureRisk}) => this.setState({exposureRisk}))
    }
    render() {
        return (
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, marginBottom: 8}}>
                    Your exposure risk is
                </Text>
                <Text category='h1'>
                    {this.state.exposureRisk}
                </Text>
            </Layout>
        )
    }
}