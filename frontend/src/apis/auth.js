import { httpClient } from '../services'
import authEndpoint from '~/services/endpoints/auth.endpoint'

class AuthApi {
  async signIn(email, password) {
    try {
      const res = await httpClient.post(authEndpoint.login, {
        email,
        password,
      })
      return res
    } catch (error) {
      throw new Error('Có lỗi xảy ra')
    }
  }

  async getOTP(email) {
    try {
      const res = await httpClient.post(authEndpoint.getotp, { email })
      return res
    } catch (error) {
      throw new Error('Có lỗi xảy ra')
    }
  }

  async verifyOTP(email, otp) {
    try {
      const res = await httpClient.post(authEndpoint.verifyotp, { email, otp })
      return res
    } catch (error) {
      throw new Error('Có lỗi xảy ra')
    }
  }

  async forgotPassword(newPassword, otp) {
    try {
      const res = await httpClient.patch(authEndpoint.forgotpassword, { newPassword, otp })
      return res
    } catch (error) {
      throw new Error('Có lỗi xảy ra')
    }
  }

  async signOut() {
    try {
      const res = await httpClient.get(authEndpoint.signout)
      return res.user
    } catch (error) {
      throw new Error('Có lỗi xảy ra')
    }
  }

  async customerRegister(formData) {
    try {
      const res = await httpClient.post(authEndpoint.register, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return { msg: res.msg }
    } catch (error) {
      // return { error: error.message || 'Đã xảy ra lỗi trong quá trình đăng ký' }
      throw new Error('Có lỗi xảy ra')
    }
  }

  async sellerRegister(formData) {
    try {
      const res = await httpClient.post(authEndpoint.register, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return { msg: res.msg }
    } catch (error) {
      // return { error: error.message || 'Đã xảy ra lỗi trong quá trình đăng ký' }
      throw new Error('Có lỗi xảy ra')
    }
  }

  async Search(filterList, page) {
    try {
      const res = await httpClient.post(`${authEndpoint.search}?page=${page}`, filterList)
      return res
    } catch (error) {
      console.log(error)
      throw new Error('Có lỗi xảy ra')
    }
  }
}

const authApi = new AuthApi()

export default authApi
