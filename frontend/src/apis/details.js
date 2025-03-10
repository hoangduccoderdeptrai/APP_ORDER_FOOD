import { httpClient } from '../services'
import detailsEndpoint from '~/services/endpoints/details.endpoint'

class DetailsApi {
  async getDetails(id, list) {
    try {
      const res = await httpClient.post(`${detailsEndpoint.getDetails}/${id}`, list)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const DetailsApiInstance = new DetailsApi()

export default DetailsApiInstance
