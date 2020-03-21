import React from 'react'
import { Layout, Text, Button } from '@ui-kitten/components';

export default class extends React.Component {

    render() {
        return (
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{marginBottom: 20}} category="h4">
                    Invite Peeps
                </Text>
            </Layout>
        )
    }
}