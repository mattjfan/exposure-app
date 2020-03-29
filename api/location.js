import * as utils from './utils';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as storage_api from './storage';
import { AsyncStorage } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';

const CACHED_LOCATION = '@EXPOSURE_APP_CACHED_PLACE_ID'

// Updates location.
// Can specify to take a new measurement, and provide options if desired

export const getInfected = () =>
     utils.post('/get-infected-places')
     

export const updateLocation = async (takeMeasurement = false, options={}) => {
    const identifier = await storage_api.getMyIdentifier();
    const old_place_id = await AsyncStorage.getItem(CACHED_LOCATION);
    (takeMeasurement ? Location.getCurrentPositionAsync(options) : Location.getLastKnownPositionAsync())
    .then(location => {
        storage_api.saveLocation(location)
        return utils.getJSONFromExternalEndpoint(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${Constants.manifest.extra.GOOGLE_MAPS_API_KEY}`);
    })
    .then(resp => resp.results[0].place_id)
    .then(new_place_id => {
        console.log('NEW PLACE ', new_place_id)
        utils.post('/update-location', { new_place_id, identifier, old_place_id })
        AsyncStorage.setItem(CACHED_LOCATION, new_place_id)
    })
    //.catch(err => console.log(err)) // currently just fail silently
}

export const updateCachedLocation = (takeMeasurement = false, options={}) =>
    (takeMeasurement ? Location.getCurrentPositionAsync(options) : Location.getLastKnownPositionAsync())
    .then(location => 
        utils.getJSONFromExternalEndpoint(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${Constants.manifest.extra.GOOGLE_MAPS_API_KEY}`))
    .then(resp => resp.results[0].place_id)
    .then(place_id => {
        console.log('MADE IT')
        AsyncStorage.setItem(CACHED_LOCATION, place_id)
        return place_id
    })
;

export const updateContactedPeersWithCachedLocation = () => {
    console.log('HEEELLOOOOOO')
    AsyncStorage.getItem(CACHED_LOCATION)
    .then(place_id => updateContactedPeers(place_id))
    
}

// can use in promise chain after updateCachedLocation() or AsyncStorage.getItem(CACHED_LOCATION)
export const updateContactedPeers = (place_id) => {
    utils.post('/get-contacted-ids', {place_id})
    .then(({ tokens }) => storage_api.putContactedTokens(tokens) )
}
