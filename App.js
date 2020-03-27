import React from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import { ScreenOrientation } from 'expo';
import { ApplicationProvider, Layout, Text, BottomNavigation, BottomNavigationTab, IconRegistry, Drawer } from '@ui-kitten/components';
import { mapping, light as lightTheme, dark } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Pages from './components/pages';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Location from 'expo-location'
import * as BackgroundFetch from 'expo-background-fetch'
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import Dev from './components/dev';
import * as api from './api';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './components/pages/Register';

const TASK_ON_LOC_CHANGE = "@EXPOSURE_APP_TASK_ON_LOC_CHANGE";
const TASK_PERIODIC_UPDATE = "@EXPOSURE_APP_TASK_PERIODIC_UPDATE";

TaskManager.defineTask(TASK_ON_LOC_CHANGE, api.location.updateLocation)

TaskManager.defineTask(TASK_PERIODIC_UPDATE, () => {
  try{
  console.log('YAAAASS');
  api.location.updateContactedPeersWithCachedLocation();
  return BackgroundFetch.Result.NewData; }
  catch(error) {
    return BackgroundFetch.Result.Failed;
  }
})

 
TaskManager.unregisterTaskAsync(TASK_PERIODIC_UPDATE)




const handleBackgroundTasksIOs = () => {
  // Location.setApiKey()
  TaskManager.isTaskRegisteredAsync(TASK_ON_LOC_CHANGE).then(isRegistered => !isRegistered &&
    Location.startLocationUpdatesAsync(TASK_ON_LOC_CHANGE, {
      accuracy: Location.Accuracy.High,
      distanceInterval: 100,
      //timeInterval: 60000,
      pausesUpdatesAutomatically: true,
    })
  )
  
  TaskManager.isTaskRegisteredAsync(TASK_PERIODIC_UPDATE).then(isRegistered => !isRegistered &&
    BackgroundFetch.registerTaskAsync(TASK_PERIODIC_UPDATE, {
      minimumInterval: 650,
      stopOnTerminate: false,
      startOnBoot: true,
    })
  )
 BackgroundFetch.setMinimumIntervalAsync(650)
}

const handleBackgroundTasksAndroid = () => {
  // UNIMPLEMENTED
}

// Find the user's OS and un appropriate background tasks callback
Platform.OS === 'ios' ? handleBackgroundTasksIOs() : handleBackgroundTasksAndroid();


const BottomTabBar = ({navigation, state}) => {
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView style={{backgroundColor: '#222B45'}}>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab title='HOME'/>
        <BottomNavigationTab title='MY SYMPTOMS'/>
        <BottomNavigationTab title='INVITE'/>
        <BottomNavigationTab title='EXPOSURE MAP'/>
      </BottomNavigation>
    </SafeAreaView>
  )

}

function TabScreen() {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Tab.Screen name="Home" component={Pages.Home}/>
    <Tab.Screen name="Report Symptoms" component={Pages.Report}/>
    <Tab.Screen name="Invite" component={Pages.Invite}/>
    <Tab.Screen name="Exposure Map" component={Pages.Map}/>
  </Tab.Navigator>
  );
};


function DrawerScreen() {
  return (
    <DrawerNav.Navigator>
    <DrawerNav.Screen name="Main" component={TabScreen} />
    <DrawerNav.Screen name="About" component={Pages.About} />
    <DrawerNav.Screen name="DEV STUFF" component={Dev}/>
  </DrawerNav.Navigator>
  )
}


export default class App extends React.Component {
  state = { Screen: Pages.Loading}

  askForPermissions = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
  }
  
  finishRegistration = () => {
    this.setState({Screen: DrawerScreen})
  }

  constructor(props) {
    super(props);
    this.askForPermissions();
  }

  componentDidMount() {

    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    api.storage.getMyIdentifier()
    .then(res => {
      console.log(`IDENTIFIER: ${res}`);
      return res;
    })
    .then(res => this.setState({Screen: res ? DrawerScreen : Pages.Register }))
  }
  render() {
    const {Screen} = this.state;

    return (
      <React.Fragment>
      <ApplicationProvider mapping={mapping} theme={dark}>
      <IconRegistry icons={EvaIconsPack}/>
        <NavigationContainer>
          <Screen onSubmit={this.finishRegistration}/>   
        </NavigationContainer>
      </ApplicationProvider>
      </React.Fragment>
    );
  }
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const DrawerNav = createDrawerNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


