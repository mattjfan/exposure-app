import React from 'react'
import {StyleSheet} from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as api from '../../../api';

export default class extends React.Component {
    state = { hasPermission: undefined }
    handleBarCodeScanned = ({data}) => {
        id = api.storage.readSerializedIdentifier(data)
        if (id) {
            api.storage.putContactedTokens([id])
            this.props.navigation.navigate("Log Contacts")
        }
    }
    componentDidMount() {
        BarCodeScanner.requestPermissionsAsync().then(
            ({status}) => this.setState({hasPermission: status === 'granted'})
        )
    }
    render() {
        return (
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {this.state.hasPermission && <BarCodeScanner
                    onBarCodeScanned = {this.handleBarCodeScanned }
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={StyleSheet.absoluteFillObject}
                />}
            </Layout>
        )
    }
}