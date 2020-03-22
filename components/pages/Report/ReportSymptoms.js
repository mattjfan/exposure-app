import React from 'react';
import { Layout, Text, Datepicker, Button, Select, Card, NativeDateService, Input } from '@ui-kitten/components';
import * as api from '../../../api';

export default class extends React.Component {
    constructor(props) {
        super(props);
        const { date, symptoms, testStatus, testDate } = props;
        this.state = {
            status: 'loading',
            date,
            symptoms,
            testStatus,
            testDate,
        }
    }

    setDate = date => this.setState({ date })
    setTestDate = testDate => this.setState({ testDate })
    dateService = new NativeDateService('en', {format: 'MM/DD/YYYY'})

    symptomsList = [
        { text: 'Chest Pains' },
        { text: 'Diarrhea' },
        { text: 'Dry Cough' },
        { text: 'Fatigue' },
        { text: 'Fever' },
        { text: 'Headache' },
        { text: 'Low Appetite' },
        { text: 'Muscle Pain' },
        { text: 'Nasal Congestion' },
        { text: 'Vomitting' },
        { text: 'Difficulty Breathing/Shortness of Breath'},
    ]

    TEST_STATUS_YES_WAITING = 'Yes, waiting on results'
    TEST_STATUS_YES_NEGATIVE = 'Yes, negative'
    TEST_STATUS_YES_POSITIVE = 'Yes, positive'

    TEST_STATUS_YESS = [
        this.TEST_STATUS_YES_WAITING,
        this.TEST_STATUS_YES_NEGATIVE,
        this.TEST_STATUS_YES_POSITIVE,
    ]

    TEST_STATUS_NO_DENIED = 'No, denied testing'
    TEST_STATUS_NO = 'No, have not requested'

    testStatus = [
        this.TEST_STATUS_YES_POSITIVE,
        this.TEST_STATUS_YES_NEGATIVE,
        this.TEST_STATUS_YES_WAITING,
        this.TEST_STATUS_NO_DENIED,
        this.TEST_STATUS_NO
    ].map(text => ({ text }))
    
    hasBeenTested = () =>
        this.state.testStatus && this.TEST_STATUS_YESS.includes(this.state.testStatus.text);

    submitReport = () => {
        const { date, symptoms, testStatus, testDate } = this.state;
        if (date && symptoms && testStatus && ( testDate || !this.hasBeenTested())) {
            api.reportSymptoms({ date, symptoms, testStatus, testDate })
        } else {
            // TODO: show validation error
        }
    }
    render() {
        const {date, symptomsList, testStatus, testDate} = this.state
        return (
            <React.Fragment>
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
                    multiSelect={true}
                    selectedOption={this.state.symptoms}
                    onSelect={symptoms => this.setState({symptoms})}
                />
                <Select
                    data={this.testStatus}
                    label="Have you been tested for COVID-19?"
                    style={{width: '100%', marginBottom: 16}}
                    selectedOption={this.state.testStatus}
                    onSelect={testStatus => this.setState({testStatus})}
                />
                {this.hasBeenTested() && 
                    <Datepicker
                        date={this.state.testDate}
                        onSelect={this.setTestDate}
                        label="When was the test taken?"
                        dateFormat='MM/DD/YYYY'
                        dateService={this.dateService}
                        style={{width: '100%', marginBottom: 8}}
                    />
                }
                <Input
                    label="Additional Notes"
                    multiline={true}
                    maxLength={500}
                    style={{ marginBottom: 20}}
                />
                <Button style={{width: '100%'}} onPress={this.submitReport}>Submit Report</Button>
            </React.Fragment>
        )
    }
}