import axios from '@/scripts/utils/axios'

/**
 * 获取消息列表
 *
 * @param params
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getListApi = (params) => {
  return axios.get('/api/message/getList', {params})
}
/**
 * 根据id获取消息
 * @param id
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getByIdApi = (id) => {
  return axios.get('/api/message/getById?id=' + id)
}

/**
 * 删除所有已读消息
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const deleteAllApi = () => {
  return axios.get('/api/message/deleteAll')
}
/**
 * 删除单个消息
 * @param id
 */
export const deleteByIdApi = (id) => {
  return axios.delete('/api/message/deleteById?id=' + id)
}
/**
 * 已读所有消息
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const readAllApi = () => {
  return axios.put('/api/message/readAll')
}
/**
 * 获取未读消息数量
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getUnreadCountApi = () => {
  return axios.get('/api/message/getUnread')
}
