import React from 'react';
// import { View, Text } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';

export default class extends React.Component {
    render() {
        return (
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    Home
                </Text>
            </Layout>
        )
    }
}