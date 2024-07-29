import axios from '@/scripts/utils/axios'
import axiosplus from "@/scripts/utils/axios";


/**
 * 获取站点列表
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getSiteNameListApi = () => {
  return axios.get('/api/webStatus/getSiteNames')
}

/**
 * 获取日志列表
 * @param params
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getLogApi = (params) => {
  return axios.get('/api/webStatus/getLog', {params})
}
