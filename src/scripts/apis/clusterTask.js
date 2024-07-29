import axios from '@/scripts/utils/axios'


export const getListApi = (params) => {
  return axios.get('/api/group_task/getList', {params})
}

export const enableDisableApi = (data) => {
  return axios.put('/api/group_task/enableDisable', data)
}
export const deleteByUuidApi = (uuid) => {
  return axios.delete('/api/group_task/deleteByUuid', {params: {uuid}})
}

export const getDetailApi = (uuid) => {
  return axios.get('/api/group_task/get_task_detailed?uuid=' + uuid)
}

export const getByUUIDApi = (uuid) => {
  return axios.get('/api/group_task/get_task_by_uuid?uuid=' + uuid)
}
export const verifyCommandApi = (command) => {
  return axios.post('/api/group_task/command_legal', {command})
}
