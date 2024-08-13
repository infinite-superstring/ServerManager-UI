import axios from '@/scripts/utils/axios'

export const getListApi = (params) => {
  return axios.post('/api/admin/auditAndLogger/nodeSessionLog', params)
}
