import { httpClient } from '~/services'
import ordersEndpoint from '~/services/endpoints/orders.endpoint'

class OrdersApi {
  async getOrders(status, page) {
    try {
      const res = await httpClient.get(`${ordersEndpoint.getOrder}?status=${status}&page=${page}`)
      return res
    } catch (error) {
      console.error(error)
      throw new Error('Có lỗi xảy ra khi lấy danh sách đơn hàng')
    }
  }

  async postEvaluation(idOrder, comment, listFood) {
    try {
      const res = await httpClient.post(ordersEndpoint.postEvaluation, {
        idOrder,
        comment,
        listFood,
      })
      return { msg: res.message }
    } catch (error) {
      console.error('Error in postEvaluation: ', error)
      throw new Error('Có lỗi xảy ra khi gửi đánh giá')
    }
  }

  async cancelOrder(idOrder) {
    try {
      const res = await httpClient.patch(ordersEndpoint.cancelOrder, { idOrder })
      return res
    } catch (error) {
      console.error('Error in cancelOrder: ', error)
      throw new Error('Có lỗi xảy ra khi hủy đơn')
    }
  }
}

const ordersApi = new OrdersApi()
export default ordersApi
