import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

export default class extends React.Component {
    render() {
        return (
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>
                    Report Symptoms
                </Text>
            </Layout>
        )
    }
}