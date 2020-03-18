import React from 'react';
import { Layout, Text, Datepicker, Button, Select, Card, NativeDateService, Input } from '@ui-kitten/components';
import {View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import ReportConfirmedCase from './ReportConfirmedCase'
const ReportStack = createStackNavigator();

export default function MyStack() {
    return (
        <ReportStack.Navigator initialRouteName="Report Symptoms">
            <ReportStack.Screen name='Report Symptoms' component={Report} />
            <ReportStack.Screen name='Report Confirmed Case' component={ReportConfirmedCase} />
        </ReportStack.Navigator>
    )
}
 class Report extends React.Component {
    state = { status: 'loading', date: new Date()}

    setDate = date => this.setState({ date })

    dateService = new NativeDateService('en', {format: 'MM/DD/YYYY'})

    symptomsList = [
        { text: 'Fever' },
        { text: 'Cough' },
        { text: 'Hard to breathe'},
    ]

    goToReportConfirmedCase = () => {
        this.props.navigation.navigate("Report Confirmed Case")
    }

    render() {
        const {date} = this.state
        return (
            <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                
                <Card style={{width: '90%'}}>
                    <Text category='h4' style={{marginBottom: 16}}> 
                        Report Symptoms
                    </Text>
                    <Datepicker
                        date={date}
                        onSelect={this.setDate}
                        label="First Observed"
                        dateFormat='MM/DD/YYYY'
                        dateService={this.dateService}
                        style={{width: '100%', marginBottom: 8}}
                    />
                    <Select
                        data={this.symptomsList}
                        label="Symptoms"
                        style={{width: '100%', marginBottom: 16}}
                    />
                    <Input
                        multiline={true}
                        maxLength={500}
                        style={{ marginBottom: 20}}
                    />
                    <Button>Log Symptom</Button>
                </Card>
               <Button onPress={this.goToReportConfirmedCase} style={{marginTop: 24}} status='danger'> I have a confirmed case</Button>

            </Layout>
        )
    }
}