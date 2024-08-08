import axios from '@/scripts/utils/axios'

export const getListApi = (params) => {
  return axios.get('/api/execute/getList', {params})
}

export const createApi = (data) => {
  return axios.post('/api/node_manager/cluster/execute/createTask', data)
}

export const getNodeResultListByUUIDApi = (uuid) => {
  return axios.get('/api/execute/getNodeResultByUUID?uuid='+uuid)
}
