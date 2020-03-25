import * as utils from './utils'
import * as location from './location'
import * as storage from './storage'
import * as jhu_data from './jhu_data'

// export const getUserInfo = () => utils.make_skeleton_endpoint()

export const getExposureRisk = () => 
    storage.getMyIdentifier()
    .then(identifier => utils.post('/get-status', { identifier }))

export const inviteFriend = (phone, contacted = false) => utils.post('invite-new-user', { phone, contacted})
    .then(({identifier}) => contacted && storage.putContactedTokens([identifier]));

export const getReportedSymptoms = identifier =>
    utils.post('/get-symptoms', { identifier });

export const getMyReportedSymptoms = () => 
    storage.getMyIdentifier()
    .then(id => getReportedSymptoms(id))
    .catch(() => undefined)

export const reportSymptoms = (data) =>
    Promise.all([
        storage.getContactedTokensWithTimestamps(),
        storage.getLocations(),
    ])
    .then(([
        contacted_individuals,
        visited_locations,
    ]) => utils.post('/report_sickness_or_positive_test', {...data, contacted_individuals, visited_locations}))

export { location, storage, jhu_data }