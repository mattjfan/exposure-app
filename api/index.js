import * as utils from './utils'
import * as location from './location'
import * as storage from './storage'
import * as jhu_data from './jhu_data'

export const getUserInfo = () => utils.make_skeleton_endpoint()

export const getExposureRisk = () => utils.make_skeleton_endpoint({ exposureRisk: 'Normal' })

export const inviteFriend = (phone_number) => utils.make_skeleton_endpoint()


export { location, storage, jhu_data }