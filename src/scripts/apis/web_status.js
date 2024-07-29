import axios from '@/scripts/utils/axios'

/**
 * 获取网站状态列表
 * @param params
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getListApi = (params) => {
  return axios.get('/api/webStatus/getList', {params})
}

/**
 * 添加网站监控
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const addApi = (data) => {
  return axios.post('/api/webStatus/addWeb', data)
}
/**
 * 删除网站监控
 * @param id
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const deleteByIdApi = (id) => {
  return axios.delete(`/api/webStatus/delWeb/${id}`)
}
/**
 * 修改网站监控
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const updateApi = (data) => {
  return axios.put('/api/webStatus/update', data)
}
