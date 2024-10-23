import express from 'express'
import { getOrderPending } from '../../Controller/seller/manageOrder.controller.js'

const manageOderRoute =express.Router()

manageOderRoute.get('/:id',getOrderPending)

export default manageOderRoute