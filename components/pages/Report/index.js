import React from 'react';
import { Layout, Text, Datepicker, Button, NativeDateService } from '@ui-kitten/components';

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
            <Layout  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text category='h2' style={{marginBottom: 16}}> 
                    Report Symptoms
                </Text>
                <Datepicker
                    date={date}
                    onSelect={this.setDate}
                    label="First Observed"
                    dateFormat='MM/DD/YYYY'
                    dateService={this.dateService}
                    style={{marginBottom: 8}}
                />

                <Button>Log Symptom</Button>

            </Layout>
        )
    }
}