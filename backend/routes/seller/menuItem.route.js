import multer from "multer";
import express from 'express'
import {createMenuItem,deleteMenuItem} from '../Controller/menuItem.controller'
//Temporory storage before Cloundinary upload
const menuItemRoute =express.Router()
const upload = multer({dest:'uploads/'}) 

menuItemRoute.post('/upload-items',upload.array('images',3),createMenuItem)
menuItemRoute.delete('delete-items',deleteMenuItem)
