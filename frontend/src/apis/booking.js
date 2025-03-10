import { httpClient } from '../services'
import bookingEndpoint from '~/services/endpoints/booking.endpoint'

class BookingApi {
  async bookingFood(payload) {
    try {
      const res = await httpClient.post(`${bookingEndpoint.bookingFood}`, payload)
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

const BookingApiInstance = new BookingApi()

export default BookingApiInstance
