import * as utils from './utils'
import * as location from './location'
import * as storage from './storage'
import * as jhu_data from './jhu_data'

// export const getUserInfo = () => utils.make_skeleton_endpoint()

export const getExposureRisk = () => 
    storage.getMyIdentifier()
    .then(identifier => utils.post('/get_exposure_risk', { identifier }))

export const inviteFriend = (phone, contacted = false) => 
    storage.getMyIdentifier()
    .then(inviter_identifier => utils.post('invite-new-user', { phone, contacted, inviter_identifier }))
    .then(({ identifier }) => contacted && storage.putContactedTokens([identifier]));

export const getReportedSymptoms = identifier =>
    utils.post('/get-symptoms', { identifier });

export const getMyReportedSymptoms = () => 
    storage.getMyIdentifier()
    .then(id => getReportedSymptoms(id))
    .catch(() => undefined)

export const reportSymptoms = (data) =>
    Promise.all([
        storage.getMyIdentifier(),
        storage.getContactedTokensWithTimestamps(),
        storage.getLocations(),
    ])
    .then(([
        identifier,
        contacted_individuals,
        visited_locations,
    ]) => utils.post('/report_sickness_or_positive_test', {...data, identifier, contacted_individuals, visited_locations}))

export { location, storage, jhu_data }