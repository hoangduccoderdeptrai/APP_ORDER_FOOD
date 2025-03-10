import { httpClient } from '../services'
import userEndpoint from '~/services/endpoints/user.endpoint'

class UserApi {
  async getMe() {
    try {
      const res = await httpClient.get(userEndpoint.getme)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  async chatBot(payload) {
    try {
      const res = await httpClient.post(userEndpoint.chatbot, payload)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

export default new UserApi()
