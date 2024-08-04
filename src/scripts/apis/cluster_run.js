import axios from '@/scripts/utils/axios'

export const getListApi = (params) => {
return axios.get('/api/execute/getList',{params})
}
