import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ScreenOrientation } from 'expo';
import { ApplicationProvider, Layout, Text, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { mapping, light as lightTheme, dark } from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Pages from './components/pages';
import * as Location from 'expo-location'

// Location.startLocationUpdatesAsync('corona_watch', {
//   accuracy: Location.Accuracy.Balanced,
//   pausesUpdatesAutomatically: true,
// })


const BottomTabBar = ({navigation, state}) => {
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title='HOME'/>
        <BottomNavigationTab title='MY SYMPTOMS'/>
        <BottomNavigationTab title='INVITE'/>
        <BottomNavigationTab title='EXPOSURE MAP'/>
      </BottomNavigation>
    </SafeAreaView>
  )

}

export default class App extends React.Component {
  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }
  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={dark}>
        <NavigationContainer>
          <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Tab.Screen name="Home" component={Pages.Home}/>
            <Tab.Screen name="Report Symptoms" component={Pages.Report}/>
            <Tab.Screen name="Invite" component={Pages.Invite}/>
            <Tab.Screen name="Exposure Map" component={Pages.Map}/>
          </Tab.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    );
  }
}

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
