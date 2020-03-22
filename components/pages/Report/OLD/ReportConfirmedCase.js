import React from 'react';
import { Text, Layout, Button } from '@ui-kitten/components'
export default class ReportConfirmedCase extends React.Component {
    render() {
        return (
            <Layout style={{ paddingLeft: 24, paddingRight: 24, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF3D71' }}>
            <Text category='h4' style={{textAlign: 'center', paddingBottom: 8}}>Self-Report{"\n"}Confirmed Case</Text>
            <Text category='p2' style={{textAlign: 'center', paddingBottom: 24}}>
                A confirmed case means that you have received testing from
                a medical professional confirming that you have been infected
                with COVID-19.  If this isn't the case and you still suspect you may have been infected,
                you can report that <Text style={{fontWeight: "bold", textDecorationLine:'underline'}}>HERE</Text> and seek medical attention if you display symptoms.
            </Text>
            <Text>
               
            </Text>
            <Button style= {{ width: '100%', marginBottom: 10, color:'#FF3D71'}} status='basic'> Yes, this is a confirmed case</Button>
            <Button style = {{width: '100%'}} status='basic' > No, but I have symptoms</Button>
            </Layout>
        )
    }
}