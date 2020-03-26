import React from 'react';
import { Layout, Text, Datepicker, Button, Select, Card, NativeDateService, Input } from '@ui-kitten/components';
import * as api from '../../../api';

export default class extends React.Component {
    constructor(props) {
        super(props);
        console.log('PROPS')
        console.log(props)
        const { test_date, symptoms, test_status, symptoms_date, additional_info } = props;
        this.state = {
            loading: false,
            // status: 'loading',
            ...(symptoms && {symptoms: this.symptomsList.filter(s => symptoms.includes(s.text))}),
            ...(symptoms_date && { symptoms_date: new Date(symptoms_date)}),
            ...(this.testStatuses.map(t => t.status).includes(test_status) && {test_status: this.testStatuses.filter(t => t.status === test_status)[0]}),
            ...(test_date && { test_date: new Date(test_date)}),
            additional_info,
        }
    }

    setDate = symptoms_date => this.setState({ symptoms_date })
    setTestDate = test_date => this.setState({ test_date })
    setAdditionalInfo = additional_info => this.setState({ additional_info })
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
        { text: 'Other' },
    ]

    TEST_STATUS_YES_POSITIVE = 'YES_POSITIVE';
    TEST_STATUS_YES_WAITING = 'YES_WAITING';
    TEST_STATUS_YES_NEGATIVE = 'YES_NEGATIVE';
    TEST_STATUS_NO_DENIED = 'NO_DENIED';
    TEST_STATUS_NO = 'NO';

    TEST_STATUS_YESS = [
        this.TEST_STATUS_YES_WAITING,
        this.TEST_STATUS_YES_NEGATIVE,
        this.TEST_STATUS_YES_POSITIVE,
    ]

    TEST_STATUS_TEXT = {
        YES_WAITING: 'Yes, waiting on results',
        YES_NEGATIVE: 'Yes, negative',
        YES_POSITIVE: 'Yes, positive',
        NO_DENIED: 'No, denied testing',
        NO: 'No, have not requested',
    }

    testStatuses = [
        this.TEST_STATUS_YES_POSITIVE,
        this.TEST_STATUS_YES_NEGATIVE,
        this.TEST_STATUS_YES_WAITING,
        this.TEST_STATUS_NO_DENIED,
        this.TEST_STATUS_NO,
    ].map(status => ({ status, text: this.TEST_STATUS_TEXT[status]}))
    
    hasBeenTested = () => {
        const { test_status } = this.state;
        return test_status && this.TEST_STATUS_YESS.includes(test_status.status)
    }

    submitReport = () => {
        const { symptoms_date, symptoms, test_status, test_date, additional_info } = this.state;
        if (symptoms_date && symptoms && test_status && ( test_date || !this.hasBeenTested())) {
            this.setState({ loading: true},
                () => api.reportSymptoms({
                    symptoms_date,
                    symptoms: symptoms.map(s => s.text),
                    test_status: test_status.status,
                    ...(test_date ? {test_date} : {test_date: symptoms_date}), //KLUDGE since test date is a 'mandatory' field
                    additional_info: additional_info || '',
                })
                .then(this.props.onSubmit)
                .catch(undefined)
                .finally(() => this.setState({ loading: false }))
            )   
        } else {
            // TODO: show validation error
        }
    }
    render() {
        const {symptoms_date, symptoms, test_status, test_date} = this.state
        return (
            <React.Fragment>
                <Datepicker
                    date={symptoms_date}
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
                    selectedOption={symptoms}
                    onSelect={symptoms => this.setState({ symptoms })}
                />
                <Select
                    data={this.testStatuses}
                    label="Have you been tested for COVID-19?"
                    style={{width: '100%', marginBottom: 16}}
                    selectedOption={test_status}
                    onSelect={test_status => this.setState({test_status})}
                />
                {this.hasBeenTested() && 
                    <Datepicker
                        date={test_date}
                        onSelect={this.setTestDate}
                        label="When was the test taken?"
                        dateFormat='MM/DD/YYYY'
                        dateService={this.dateService}
                        style={{width: '100%', marginBottom: 8}}
                    />
                }
                <Input
                    label="Additional Notes"
                    style={{ marginBottom: 20}}
                    value={this.state.additional_info}
                    onChangeText={this.setAdditionalInfo}
                />
                <Button style={{width: '100%'}} onPress={this.submitReport} disabled={this.state.loading}>Submit Report</Button>
            </React.Fragment>
        )
    }
}