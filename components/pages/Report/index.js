import React from 'react';
import { Layout, Text, Datepicker, Button, Select, Card, NativeDateService, Input } from '@ui-kitten/components';
import * as api from '../../../api';
import { createStackNavigator } from '@react-navigation/stack';
import ReportSymptoms from './ReportSymptoms';
import Loading from '../Loading';

const ReportStack = createStackNavigator();

export default class extends React.Component{
    state = { initialRouteName: undefined }
    componentDidMount() {
        api.getMyReportedSymptoms()
        .then(response => {
            if (response && response.hasResults) {
                this.setState({...response, initialRouteName: 'Reported Symptoms'})
            } else {
                this.setState({ initialRouteName: 'Report New Symptoms'})
            }
        })
    }

    render() {
        const {initialRouteName} = this.state
        return (
            initialRouteName ? (
                <ReportStack.Navigator initialRouteName={initialRouteName}>
                    <ReportStack.Screen options={{ headerShown: false }} name='Report New Symptoms' component={ReportNewSymptoms} />
                    <ReportStack.Screen options={{ headerShown: false }} name = "Reported Symptoms" component={HasReportedSymptoms} />
                    <ReportStack.Screen name='Update Symptoms' component={UpdateSymptoms}  options={{headerStyle: {backgroundColor: '#222B45', elevation: 0, shadowOpacity: 0}, headerTintColor:'white', headerTitleStyle: {fontWeight: 'bold'}}} />
                </ReportStack.Navigator>
            ) :
            <Loading />
        )
    }
}
class ReportNewSymptoms extends React.Component {
    render() {
        return (
            <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 32, paddingRight: 32 }}>
                <Text category='h4' style={{marginBottom: 16}}> 
                    Report Symptoms
                </Text>
                <ReportSymptoms />
            </Layout>
        )
    }
}

class HasReportedSymptoms extends React.Component {
    render() {
        return (
            <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 32, paddingRight: 32 }}>
            <Text category='h4' style={{marginBottom: 16, textAlign: 'center'}}> 
                Thanks! You have already reported symptoms.
            </Text>
            <Button onPress={() => this.props.navigation.navigate("Update Symptoms")}>Update Symptoms</Button>
        </Layout>
        )
    }
}
class UpdateSymptoms extends React.Component {
    render() {
        // const { date, symptoms, testStatus, testDate } = this.state;
        return (
            <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 32, paddingRight: 32 }}>
            <Text category='h4' style={{marginBottom: 16}}> 
                Update Symptoms
            </Text>
            <ReportSymptoms {...this.state} />
        </Layout>
        )
    }
}