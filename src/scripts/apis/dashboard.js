/**
 * 仪表盘API
 *
 */
import axios from '@/scripts/utils/axios'

/**
 * 获取节点概览
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getNodeOverviewApi = () => {
  return axios.get('/api/dashboard/getOverview')
}

/**
 * 获取节点列表
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getNodeListApi = () => {
  return axios.get('/api/dashboard/getNodeList')
}

/**
 * 获取统计数据
 */
export const getStatisticsApi = () => {
  return axios.get("/api/dashboard/getStatistics")
}

/**
 * 获取考勤状态
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getCheckInStatusApi = () => {
  return axios.get('/api/task/getCheckInStatus')
}

/**
 * 考勤打卡
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const attendanceCheckInApi = () => {
  return axios.post('/api/task/attendanceCheckIn')
}
