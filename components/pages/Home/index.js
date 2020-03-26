import React from 'react';
import { View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';
import * as api from '../../../api';
import Loading from '../Loading';

const prettyFormat = slug => slug.replace('_',' ')

export default class extends React.Component {
    state = {status: 'loading'}
    componentDidMount () {
        api.getExposureRisk()
        .then(resp => this.setState({...resp, status: 'loaded' }))
        .catch(() => this.setState({ status: 'error'}))
    }
    render() {
        const {status, exposure_risk, rationale, guidance} = this.state
        if (this.state.status === 'error') {
            return (
                <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20}}>
                    <Text style={{ fontSize: 20 }}>
                        Oops. Looks like there was an issue connecting to the server.
                        Try again later
                    </Text>
                </Layout> 
            )
        }
        return this.state.status === 'loaded' ? (
            <Layout 
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 20,
                    paddingRight: 20,
                    ...(exposure_risk === 'AT_RISK' && {backgroundColor: '#FFAA00'}),
                    ...(exposure_risk === 'CONFIRMED' && {backgroundColor: '#FF3D71'}),
                }}
            >
                <View>
                <Text style={{ fontSize: 20, marginBottom: 8}}>
                    Your exposure risk is
                </Text>
                <Text category='h1' style={{ marginBottom: 8}}>
                    {prettyFormat(exposure_risk)}
                </Text>
                <Text style={{ marginBottom: 8}}>
                    {this.state.rationale}
                </Text>
                <Text>
                    {this.state.guidance}
                </Text>
                </View>

            </Layout>
        )
        : <Loading />
    }
}