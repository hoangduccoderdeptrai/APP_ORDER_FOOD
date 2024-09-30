import express from 'express'
import { MyUserController } from '../Controller/MyUserController.js'
const route =express.Router()

route.post('/',MyUserController.createCurrentUser)
export const myUserRoute =route