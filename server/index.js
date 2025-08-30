import express from 'express'
import cors from 'cors'
import todoRouter from './routers/todoRouter.js'
import userRouter from './routers/userRouter.js'

// Portti luetaan ympäristömuuttujista, esim. .env tiedostosta
const port = process.env.PORT

const app = express()
app.use(cors()) // Sallii cross pyynnöt frontin ja backendin välillä
app.use(express.json()) // Parsii JSON bodyt requesteista
app.use(express.urlencoded({extended: false}))

// Reitit
app.use('/', todoRouter) 
app.use('/user', userRouter)

// Virheenkäsittelijä
app.use((err, req, res, next) => {
    const statusCode = err.status || 500
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode
        }
    })
})

// Käynnistää serverin kuuntelemaan määritettyjä portteja
app.listen(port)

