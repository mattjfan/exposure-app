import React from 'react';
import { Layout, Text, Datepicker, Button, Select, Card, NativeDateService, Input } from '@ui-kitten/components';

export default class extends React.Component {
    state = { status: 'loading', date: new Date()}

    setDate = date => this.setState({ date })

    dateService = new NativeDateService('en', {format: 'MM/DD/YYYY'})

    symptomsList = [
        { text: 'Fever' },
        { text: 'Cough' },
        { text: 'Hard to breathe'},
    ]

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
            </Layout>
        )
    }
}