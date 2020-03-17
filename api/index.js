import * as utils from './utils'

export const getUserInfo = () => utils.make_skeleton_endpoint()

export const getExposureRisk = () => utils.make_skeleton_endpoint({ exposureRisk: 'Normal' })