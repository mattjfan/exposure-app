import { AsyncStorage } from 'react-native';
import * as utils from './utils';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';

const CONTACTED_TOKENS_KEY = '@EXPOSURE_APP_CONTACTED_TOKENS' // object of form { token: last_contact_timestamp} for all recorded contacts
const MY_TOKENS_KEY = '@EXPOSURE_APP_SELF_TOKENS' // list of all known tokens given to others as a self identifier... Currently unused
const MY_IDENTIFIER = '@EXPOSURE_APP_MY_IDENTIFIER'
const CURRENT_LOCATION = '@EXPOSURE_APP_PLACE_ID'
export const putContactedTokens = (tokens) => {
    AsyncStorage.getItem(
        CONTACTED_TOKENS_KEY,
        (err, _old_tokens) => {
            const old_tokens = _old_tokens ?  JSON.parse(_old_tokens) : {}
            tokens.forEach(tkn => {
                old_tokens[tkn] =  new Date() // Just keeping most recent contact
            });
            AsyncStorage.setItem(CONTACTED_TOKENS_KEY, JSON.stringify(old_tokens))
        }
    )
}
export const getContactedTokensAfter = async (date) => {
    const user_tokens = await AsyncStorage.getItem(CONTACTED_TOKENS_KEY).then(res => res ? JSON.parse(res) : {})
    return user_tokens ? (
            Object.keys(user_tokens)
            .filter(k => new Date(user_tokens[k]) > date) // filter for last contact days AFTER specified date
        )
        : [] // return empty array by default
}

export const sendUserTokensAfter = date => {
   getContactedTokensAfter(date)
   .then(tokens => utils.post('/UNIMPLEMENTED', { tokens }))
} //UNIMPLEMENTED

export const getUserTokens = () => {
    return getUserTokensAfter(new Date(0))
}

export const getMyIdentifier = () => 
    AsyncStorage.getItem(MY_IDENTIFIER) ||
    (
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(status => status === 'granted' && Notifications.getExpoPushTokenAsync())
        .then(push_token => utils.post('/request-identifier', { push_token }))
        .then(({identifier}) => identifier)
        .catch(() => undefined)
    )

const JSON_IDENTIFIER_APP_NAME = '@EXPOSURE_APP_JSON_SERIALIZED_ID'

export const writeSerializedIdentifier = () =>
    getMyIdentifier()
    .then(id => JSON.stringify({ id, name: JSON_IDENTIFIER_APP_NAME }))

export const readSerializedIdentifier = (serialized_id) => {
    try {
        const id_object = JSON.parse(serialized_id)
        return id_object.name === JSON_IDENTIFIER_APP_NAME && id_object.id
    } catch(e) {
        // TODO: add error handle
        return undefined
    }
}