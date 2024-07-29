import axios from '@/scripts/utils/axios'

/**
 * 获取考勤任务的考勤记录
 * @param params
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getDutyApi = (params) => {
  return axios.get('/api/task/getDuty?year_and_month=' + params)
}
