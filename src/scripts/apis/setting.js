import axios from "@/scripts/utils/axios";

/**
 * 获取设置
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getSettingApi = () => {
  return axios.get('/api/admin/settings/getSettings')
}

/**
 * 编辑设置
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const editSettingApi = (data) => {
  return axios.post('/api/admin/settings/editSettings', data)
}

/**
 * 获取服务器配置
 */
export const getServerConfigApi = () => {
  return axios.get("/api/settings/getServerConfig")
}
