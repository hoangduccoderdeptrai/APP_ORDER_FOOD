import axios from 'axios'
// import { authApi } from '../apis'
// import _createAuthRefreshInterceptor from 'axios-auth-refresh'

class HttpClient {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
    this.instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    })
  }

  getUrl(endpoint) {
    return `${this.baseUrl}${endpoint}`
  }

  async get(endpoint, config) {
    const response = await this.instance.get(this.getUrl(endpoint), config)
    return response.data
  }

  async post(endpoint, data, config) {
    const response = await this.instance.post(this.getUrl(endpoint), data, config)
    return response.data
  }

  async patch(endpoint, data, config) {
    const response = await this.instance.patch(this.getUrl(endpoint), data, config)
    return response.data
  }

  async delete(endpoint, config) {
    const response = await this.instance.delete(this.getUrl(endpoint), config)
    return response.data
  }

  // setAuthHeader(token) {
  //   this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  // }

  // removeAuthHeader() {
  //   delete this.instance.defaults.headers.common['Authorization']
  // }
}

export function handleError(error, onError) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status >= 500 && error.response.status < 600) {
        throw new Error('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
      }

      onError?.(error.response)
    } else {
      throw new Error('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
    }
  } else {
    throw new Error('Đã có lỗi xãy ra. Vui lòng thử lại sau.')
  }
}

const httpClient = new HttpClient()

export default httpClient
