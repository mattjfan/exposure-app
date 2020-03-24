import React from 'react'
import {Marker} from 'react-native-maps'
import {Icon} from '@ui-kitten/components'

export default class extends React.PureComponent {
    
    render(){
      return (
        <Marker
          coordinate={this.props.coord}
          tracksViewChanges={false}
          fadeDuration={0}
        >
        <Icon name='alert-circle'
            width={32}
            height={32}
            fill='#FF7E6D'
                    />
        </Marker>
      );
    }
  }
