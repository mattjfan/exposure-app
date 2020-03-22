import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
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


const TASK_ON_LOC_CHANGE = "@EXPOSURE_APP_TASK_ON_LOC_CHANGE";
const TASK_PERIODIC_UPDATE = "@EXPOSURE_APP_TASK_PERIODIC_UPDATE";

TaskManager.defineTask(TASK_ON_LOC_CHANGE, () => {return null})
TaskManager.defineTask(TASK_PERIODIC_UPDATE, () => {return null})

// Location.setApiKey()
TaskManager.isTaskRegisteredAsync(TASK_ON_LOC_CHANGE).then(isRegistered => !isRegistered &&
  Location.startLocationUpdatesAsync(TASK_ON_LOC_CHANGE, {
    accuracy: Location.Accuracy.Balanced,
    pausesUpdatesAutomatically: true,
  })
)

TaskManager.isTaskRegisteredAsync(TASK_PERIODIC_UPDATE).then(isRegistered => !isRegistered &&
  BackgroundFetch.registerTaskAsync(TASK_PERIODIC_UPDATE, {
    minimumInterval: 300,
    stopOnTerminate: false,
    startOnBoot: true,
  })
)

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

export default class App extends React.Component {
  
  askForPermissions = async () => {
    let {status} = await Permissions.askAsync(Permissions.LOCATION)
  }
  
  constructor(props) {
    super(props);
    this.askForPermissions();
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }
  render() {
    return (
      <React.Fragment>
      <ApplicationProvider mapping={mapping} theme={dark}>
      <IconRegistry icons={EvaIconsPack}/>
        <NavigationContainer>
          <DrawerNav.Navigator>
            <DrawerNav.Screen name="Main" component={TabScreen} />
          </DrawerNav.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
      </React.Fragment>
    );
  }
}

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
