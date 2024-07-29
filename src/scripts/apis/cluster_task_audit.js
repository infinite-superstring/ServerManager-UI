import axiosplus from "@/scripts/utils/axios";

/**
 * 获取任务名称列表
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getTaskNameListApi = () => {
  return axiosplus.get('/api/admin/auditAndLogger/groupTask/getNameList')
}

/**
 * 获取任务结果详情
 * @param params
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const getTaskResultDetailApi = (params) => {
  return axiosplus.get('/api/admin/auditAndLogger/groupTask/get_result_detail', {params})
}
