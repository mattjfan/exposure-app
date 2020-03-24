import * as utils from './utils'
import * as location from './location'
import * as storage from './storage'
import * as jhu_data from './jhu_data'

export const getUserInfo = () => utils.make_skeleton_endpoint()

export const getExposureRisk = () => utils.make_skeleton_endpoint({ exposureRisk: 'Normal' })

export const inviteFriend = (phone, contacted = false) => utils.post('invite-new-user', { phone, contacted})

export const getReportedSymptoms = user_id => utils.make_skeleton_endpoint()
<<<<<<< HEAD
=======

export const getMyReportedSymptoms = () => 
    storage.getMyIdentifier()
    .then(id => getReportedSymptoms(id))

export const reportSymptoms = (data) => utils.post('/report-symptoms', data)
>>>>>>> master

export const getMyReportedSymptoms = () => 
    storage.getMyIdentifier()
    .then(id => getReportedSymptoms(id))

export const reportSymptoms = (data) => utils.post('/report-symptoms', data)

export { location, storage, jhu_data }