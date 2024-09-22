import express from 'express'
import connect from './DB_Mongoose/connect_BD.js'
import cors from 'cors'
import {myUserRoute} from './routes/myUserRoute.js'
import 'dotenv/config.js'
function run(){
    const app =express()
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(express.static('public'))
    app.use(cors())
   
    app.listen("3000",()=>{
        console.log('server is listening')
    })
}

(async()=>{
    await connect(process.env.URI)
    run()
})()
