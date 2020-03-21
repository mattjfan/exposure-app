import React from 'react';
import { Layout, Text, Datepicker, Button, Select, Card, NativeDateService, Input } from '@ui-kitten/components';
import {View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ReportConfirmedCase from './ReportConfirmedCase'
import ReportSymptoms from './ReportSymptoms';

const ReportStack = createStackNavigator();

export default function MyStack() {
    return (
        <ReportStack.Navigator initialRouteName="Report">
            <ReportStack.Screen options={{ headerShown: false }} name='Report' component={Report} />
            <ReportStack.Screen options={{headerStyle: {backgroundColor: '#FF3D71', elevation: 0, shadowOpacity: 0}, headerTintColor:'white', headerTitleStyle: {fontWeight: 'bold'}}} name='Report Confirmed Case' component={ReportConfirmedCase} />
            <ReportStack.Screen name='Report Symptoms' component={ ReportSymptoms} options={{headerStyle: {backgroundColor: '#222B45', elevation: 0, shadowOpacity: 0}, headerTintColor:'white', headerTitleStyle: {fontWeight: 'bold'}}} />
        </ReportStack.Navigator>
    )
}
 class Report extends React.Component {
    goToReportConfirmedCase = () => {
        this.props.navigation.navigate("Report Confirmed Case")
    }
    goToReportSymptoms = () => {
        this.props.navigation.navigate("Report Symptoms")
    }

    render() {
        return (
            <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                <Text category='h4'>Are you sick?</Text>
                <Button onPress={this.goToReportSymptoms} style={{marginTop: 24, width: '100%'}}> I want to report symptoms</Button>
                <Button onPress={this.goToReportConfirmedCase} style={{marginTop: 24, width: '100%' }} status='danger'> I have a confirmed case</Button>
            </Layout>
        )
    }
}