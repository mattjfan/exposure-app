import React from 'react'
import {Spinner, Layout, Text} from '@ui-kitten/components'

function _Loader() {
    return (
        <React.Fragment>
        <Spinner size="giant" status="basic" />
        <Text style={{paddingTop: 8}}>Loading...</Text>
        </React.Fragment>

    )
}

export default class extends React.Component {
    
    Loader = _Loader

    render() {
        return (
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20}}>
                {<this.Loader />}
            </Layout>
        )
    };

}