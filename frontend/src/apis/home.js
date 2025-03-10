import { httpClient } from '../services'
import homeEndpoint from '~/services/endpoints/home.endpoint'

class HomeApi {
  async getHome() {
    try {
      const res = await httpClient.get(homeEndpoint.gethome)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const homeApiInstance = new HomeApi() // Đổi tên biến instance để tránh trùng tên

export default homeApiInstance
