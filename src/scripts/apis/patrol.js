import axios from '@/scripts/utils/axios'

export const uploadImageApi = (data) => {
  return axios.post('/api/patrol/upload_image', data)
}

export const getImageApi = (imageId) => {
  return axios.get('/api/patrol/get_image', {params: {imageId: imageId}})
}
