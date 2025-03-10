import { create } from 'zustand'
import user from '~/apis/user'

const initialState = {
  isAuth: null,
  user: null,
}

const useAuth = create((set) => {
  return {
    ...initialState,
    login() {
      set({ isAuth: true })
    },
    logout() {
      set({ isAuth: false })
    },
    setUser(user) {
      set({ user })
    },
    async fetchMe() {
      try {
        const res = await user.getMe()
        set({ user: res })
      } catch (error) {
        console.log(error)
        this.logout()
      }
    },
  }
})

export default useAuth
